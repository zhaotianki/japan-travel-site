import { MousePointerClick, Power, Save, TrendingUp } from "lucide-react";
import {
  createDestinationAction,
  createExperienceAction,
  logoutAdmin,
  toggleExperienceAction,
  updateInquiryStatusAction,
} from "@/features/admin/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency, formatDate } from "@/lib/format";
import type { getAdminData } from "@/lib/data";

type AdminData = Awaited<ReturnType<typeof getAdminData>>;

export function AdminDashboard({ data }: { data: AdminData }) {
  const estimatedAffiliateRevenue = data.affiliateClicks.reduce(
    (sum, click) => sum + click.estimatedCommissionCny,
    0,
  );
  const topAffiliateCampaigns = Object.values(
    data.affiliateClicks.reduce<
      Record<
        string,
        {
          campaignId: string;
          provider: string;
          clicks: number;
          estimatedRevenue: number;
        }
      >
    >((acc, click) => {
      acc[click.campaignId] ??= {
        campaignId: click.campaignId,
        provider: click.provider,
        clicks: 0,
        estimatedRevenue: 0,
      };
      acc[click.campaignId].clicks += 1;
      acc[click.campaignId].estimatedRevenue += click.estimatedCommissionCny;
      return acc;
    }, {}),
  ).sort((a, b) => b.estimatedRevenue - a.estimatedRevenue);

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">后台 CMS</p>
          <h1 className="mt-2 text-3xl font-semibold">内容与询单处理</h1>
        </div>
        <form action={logoutAdmin}>
          <Button type="submit" variant="outline">
            <Power className="h-4 w-4" aria-hidden="true" />
            退出
          </Button>
        </form>
      </div>

      <section className="grid gap-4 lg:grid-cols-5">
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">目的地</p>
          <p className="mt-1 text-3xl font-semibold">{data.destinations.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">体验</p>
          <p className="mt-1 text-3xl font-semibold">{data.experiences.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">询单</p>
          <p className="mt-1 text-3xl font-semibold">{data.inquiries.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">广告点击</p>
          <p className="mt-1 flex items-center gap-2 text-3xl font-semibold">
            <MousePointerClick className="h-6 w-6 text-primary" aria-hidden="true" />
            {data.affiliateClicks.length}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">预计佣金</p>
          <p className="mt-1 flex items-center gap-2 text-3xl font-semibold">
            <TrendingUp className="h-6 w-6 text-primary" aria-hidden="true" />
            {formatCurrency(estimatedAffiliateRevenue)}
          </p>
        </Card>
      </section>

      <section className="grid gap-4">
        <h2 className="text-xl font-semibold">收入入口</h2>
        <div className="overflow-x-auto rounded-md border border-border bg-card">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="p-3">广告</th>
                <th className="p-3">点击</th>
                <th className="p-3">预计佣金</th>
                <th className="p-3">最近来源</th>
              </tr>
            </thead>
            <tbody>
              {topAffiliateCampaigns.length > 0 ? (
                topAffiliateCampaigns.map((campaign) => {
                  const latestClick = data.affiliateClicks.find(
                    (click) => click.campaignId === campaign.campaignId,
                  );
                  return (
                    <tr key={campaign.campaignId} className="border-t border-border">
                      <td className="p-3">
                        <p className="font-medium">{campaign.provider}</p>
                        <p className="font-mono text-xs text-muted-foreground">
                          {campaign.campaignId}
                        </p>
                      </td>
                      <td className="p-3">{campaign.clicks}</td>
                      <td className="p-3">{formatCurrency(campaign.estimatedRevenue)}</td>
                      <td className="p-3 text-muted-foreground">
                        {latestClick?.source ?? "home"} ·{" "}
                        {latestClick
                          ? latestClick.createdAt.toLocaleDateString("zh-CN")
                          : "暂无"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="border-t border-border">
                  <td className="p-3 text-muted-foreground" colSpan={4}>
                    暂无广告点击
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <Card className="grid gap-4 p-5">
          <h2 className="text-xl font-semibold">新增目的地</h2>
          <form action={createDestinationAction} className="grid gap-3">
            <div className="grid gap-3 md:grid-cols-2">
              <Input name="name" placeholder="名称" required />
              <Input name="slug" placeholder="slug，如 nagoya" required />
              <Input name="region" placeholder="地区" required />
              <Input name="season" placeholder="最佳季节" required />
              <Input name="budgetMin" type="number" placeholder="最低预算" required />
              <Input name="budgetMax" type="number" placeholder="最高预算" required />
            </div>
            <Input name="coverImage" placeholder="封面图片 URL" required />
            <Textarea name="summary" placeholder="摘要" required />
            <Textarea name="description" placeholder="详细介绍" required />
            <label className="flex items-center gap-2 text-sm">
              <input name="featured" type="checkbox" />
              首页推荐
            </label>
            <Button type="submit" className="w-fit">
              <Save className="h-4 w-4" aria-hidden="true" />
              保存目的地
            </Button>
          </form>
        </Card>

        <Card className="grid gap-4 p-5">
          <h2 className="text-xl font-semibold">新增体验</h2>
          <form action={createExperienceAction} className="grid gap-3">
            <Select name="destinationId" required>
              {data.destinations.map((destination) => (
                <option key={destination.id} value={destination.id}>
                  {destination.name}
                </option>
              ))}
            </Select>
            <div className="grid gap-3 md:grid-cols-2">
              <Input name="title" placeholder="标题" required />
              <Input name="slug" placeholder="slug" required />
              <Input name="priceFrom" type="number" placeholder="价格起点" required />
              <Input
                name="durationHours"
                type="number"
                step="0.5"
                placeholder="时长小时"
                required
              />
              <Input name="difficulty" placeholder="难度" defaultValue="轻松" required />
              <Input name="language" placeholder="语言" defaultValue="中文" required />
              <Input name="rating" type="number" step="0.1" defaultValue="4.6" required />
              <Input name="reviewCount" type="number" defaultValue="0" required />
              <Input name="startTime" placeholder="开始时间" defaultValue="09:30" required />
              <Input name="meetingPoint" placeholder="集合点" required />
            </div>
            <Input name="coverImage" placeholder="封面图片 URL" required />
            <Input name="audience" placeholder="适合人群，逗号分隔" required />
            <Input name="themes" placeholder="主题，逗号分隔" required />
            <Textarea name="summary" placeholder="摘要" required />
            <Textarea name="description" placeholder="详情" required />
            <Textarea name="restrictions" placeholder="限制" required />
            <Input
              name="cancellationPolicy"
              defaultValue="出发前 48 小时可免费取消"
              required
            />
            <Input name="includes" placeholder="包含，逗号分隔" required />
            <Input name="excludes" placeholder="不包含，逗号分隔" required />
            <label className="flex items-center gap-2 text-sm">
              <input name="includesMeal" type="checkbox" />
              含餐
            </label>
            <Button type="submit" className="w-fit">
              <Save className="h-4 w-4" aria-hidden="true" />
              保存体验
            </Button>
          </form>
        </Card>
      </section>

      <section className="grid gap-4">
        <h2 className="text-xl font-semibold">询单</h2>
        <div className="overflow-x-auto rounded-md border border-border bg-card">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="p-3">编号</th>
                <th className="p-3">联系人</th>
                <th className="p-3">出行</th>
                <th className="p-3">预算</th>
                <th className="p-3">状态</th>
                <th className="p-3">操作</th>
              </tr>
            </thead>
            <tbody>
              {data.inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="border-t border-border">
                  <td className="p-3 font-mono text-xs">{inquiry.id}</td>
                  <td className="p-3">
                    <p className="font-medium">{inquiry.name}</p>
                    <p className="text-muted-foreground">
                      {inquiry.email} · {inquiry.phone}
                    </p>
                  </td>
                  <td className="p-3">
                    {formatDate(inquiry.travelDate)} · {inquiry.partySize} 人
                  </td>
                  <td className="p-3">
                    {inquiry.budget ? formatCurrency(inquiry.budget) : "待确认"}
                  </td>
                  <td className="p-3">
                    <Badge>{inquiry.status}</Badge>
                  </td>
                  <td className="p-3">
                    <form action={updateInquiryStatusAction} className="flex gap-2">
                      <input type="hidden" name="id" value={inquiry.id} />
                      <Select name="status" defaultValue={inquiry.status}>
                        <option value="new">new</option>
                        <option value="contacted">contacted</option>
                        <option value="quoted">quoted</option>
                        <option value="closed">closed</option>
                      </Select>
                      <Button type="submit" variant="outline" size="sm">
                        更新
                      </Button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="text-xl font-semibold">体验管理</h2>
        <div className="grid gap-3">
          {data.experiences.map((experience) => (
            <Card key={experience.id} className="grid gap-3 p-4 md:grid-cols-[1fr_auto]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{experience.title}</p>
                  <Badge>{experience.destination.name}</Badge>
                  <Badge>{experience.isActive ? "已上架" : "已下架"}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatCurrency(experience.priceFrom)} · {experience.durationHours} 小时 ·{" "}
                  {experience.updatedAt.toLocaleDateString("zh-CN")}
                </p>
              </div>
              <form action={toggleExperienceAction}>
                <input type="hidden" name="id" value={experience.id} />
                <input
                  type="hidden"
                  name="isActive"
                  value={experience.isActive ? "true" : "false"}
                />
                <Button type="submit" variant="outline">
                  {experience.isActive ? "下架" : "上架"}
                </Button>
              </form>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
