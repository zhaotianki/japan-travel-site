# Codex 全球教学博客

中文主站的 Codex 与 AI 编程教学博客，使用 Next.js App Router、React 和 TypeScript。

## 本地运行

```bash
npm install
npm run dev
```

## 内容更新

```bash
npm run content:update
```

更新脚本会抓取公开来源、去重并更新本地案例库。GitHub Actions 已配置为每周一、三、五运行。

## 商业化配置

复制 `.env.example` 到 `.env.local` 并填写：

- `NEXT_PUBLIC_ADSENSE_CLIENT`
- `NEXT_PUBLIC_ADSENSE_SLOT`
- `NEXT_PUBLIC_CONTACT_URL`
- `NEXT_PUBLIC_AFFILIATE_LINKS`
- `NEXT_PUBLIC_SPONSOR_ADS`

没有 AdSense ID 时，网站会显示内置站内赞助广告卡片。配置 `NEXT_PUBLIC_ADSENSE_CLIENT` 和 `NEXT_PUBLIC_ADSENSE_SLOT` 后，固定广告位会切换为 Google AdSense；只配置 client 时仍会加载 AdSense Auto Ads 脚本。

自定义赞助广告示例：

```json
[{"id":"custom","placement":"sidebar-top","eyebrow":"广告 / Sponsored","title":"你的广告标题","description":"广告描述","cta":"立即查看","href":"https://example.com","tags":["赞助","AI工具"]}]
```

AdSense 需要先通过 Google 审核。面向 EEA、英国、瑞士用户投放广告时，需要使用 Google 认证 CMP 或 AdSense consent message。
