import { expect, test } from "@playwright/test";

test("interactive Japan map highlights selected regions", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "点击城市或地区，高亮目的地" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "选择九州" }).click();
  await expect(page.getByTestId("region-panel")).toContainText(
    "九州适合美食、温泉和火山海岸",
  );
  await expect(page.getByRole("link", { name: "搜索福冈" })).toHaveAttribute(
    "href",
    "/search?destination=%E7%A6%8F%E5%86%88",
  );

  await page.getByRole("button", { name: "选择中国" }).click();
  await expect(page.getByTestId("region-prefectures")).toHaveText(
    "鸟取 | 岛根 | 冈山 | 广岛 | 山口",
  );
  await expect(page.getByTestId("region-panel")).toContainText(
    "日本西部的海岸线、历史城市和岛屿慢行路线",
  );
  await expect(page.getByTestId("active-region-highlight")).toHaveAttribute(
    "d",
    /^M194 400/,
  );

  await page.getByRole("button", { name: "选择关东" }).click();
  await expect(page.getByTestId("region-panel")).toContainText(
    "东京、日光和箱根构成第一次访日",
  );
  await expect(
    page.getByRole("link", { name: "查看东京目的地" }),
  ).toHaveAttribute("href", "/destinations/tokyo");
});

test("search, filter, build itinerary, submit inquiry, and view admin", async ({
  page,
}, testInfo) => {
  const travelerName = `张三-${testInfo.project.name}`;
  await page.goto("/");
  await page.getByLabel("目的地").fill("东京");
  await page.getByRole("button", { name: "搜索" }).click();
  await expect(page).toHaveURL(/\/search/);
  await expect(page.getByRole("heading", { name: /可选体验/ })).toBeVisible();

  await page.getByLabel("最高预算").fill("700");
  await page.getByLabel("是否含餐").selectOption("true");
  await page.getByRole("button", { name: "应用筛选" }).click();
  await expect(page).toHaveURL(/includesMeal=true/);

  await page.getByRole("link", { name: "查看详情" }).first().click();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("button", { name: /加入行程/ }).click();

  await page.goto("/search?destination=京都");
  await page.getByRole("button", { name: /加入行程/ }).first().click();
  await page.goto("/search?destination=大阪");
  await page.getByRole("button", { name: /加入行程/ }).first().click();

  await page.goto("/itinerary/new");
  await expect(page.getByText("预算汇总")).toBeVisible();
  await page
    .getByRole("button", { name: /浅草老街与隅田川半日漫游/ })
    .click();
  await page
    .getByRole("button", { name: /锦市场与京都厨房小吃/ })
    .click();
  await page
    .getByRole("button", { name: /道顿堀与难波夜间美食/ })
    .click();
  await expect(
    page.getByRole("button", { name: "保存并生成分享链接" }),
  ).toBeEnabled();
  await page.getByRole("button", { name: "保存并生成分享链接" }).click();
  await expect(page).toHaveURL(/\/itinerary\//);

  const inquiryHref = await page
    .getByRole("link", { name: "提交询单" })
    .getAttribute("href");
  await page.goto(inquiryHref ?? "/inquiry");
  await page.getByLabel("姓名").fill(travelerName);
  await page.getByLabel("邮箱").fill("zhangsan@example.com");
  await page.getByLabel("电话 / 微信").fill("13800000000");
  await page.getByRole("button", { name: "提交询单" }).click();
  await expect(page.getByText("询单已提交")).toBeVisible();

  await page.goto("/admin");
  await page.getByLabel("密码").fill("admin123");
  await page.getByRole("button", { name: "登录" }).click();
  await expect(page.getByRole("heading", { name: "内容与询单处理" })).toBeVisible();
  await expect(page.getByText(travelerName).first()).toBeVisible();
});
