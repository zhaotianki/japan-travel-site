import {
  BadgePercent,
  ExternalLink,
  Megaphone,
  TrendingUp,
} from "lucide-react";
import { GoogleAdSenseSlot } from "@/components/ads/google-adsense-slot";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getAdCampaigns,
  getAffiliateMarketingShare,
  getEstimatedCommission,
  getTrackedAdHref,
} from "@/lib/ad-campaigns";

type TravelAdSlotProps = {
  source?: string;
  compact?: boolean;
};

export function TravelAdSlot({
  source = "home",
  compact = false,
}: TravelAdSlotProps) {
  const adsenseClient = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;
  const adsenseSlot = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_HOME_SLOT;
  const campaigns = getAdCampaigns();
  const affiliateShare = getAffiliateMarketingShare();
  const adsenseShare = 100 - affiliateShare;

  return (
    <section className="bg-background" data-testid="travel-ad-slot">
      <div
        className={
          compact
            ? "grid gap-4"
            : "mx-auto grid w-full max-w-7xl gap-5 px-4 py-10 sm:px-6 lg:px-8"
        }
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>联盟营销</Badge>
              <Badge>展示广告</Badge>
            </div>
            <h2 className="mt-3 text-2xl font-semibold">收益组合</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              按日本自由行用户的购买顺序配置：先推高客单酒店机酒，再推门票体验，
              出发前补 eSIM，AdSense 作为展示广告补充。
            </p>
          </div>
          <Badge className="bg-primary text-primary-foreground">
            营销比例：联盟 {affiliateShare}% / 广告 {adsenseShare}%
          </Badge>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {campaigns.map((campaign) => {
            const estimatedCommission = getEstimatedCommission(campaign);

            return (
              <Card
                key={campaign.id}
                className="grid gap-4 border-primary/20 p-5"
                data-testid={`affiliate-card-${campaign.id}`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{campaign.marketingShare}%</Badge>
                  <Badge>{campaign.badge}</Badge>
                  <Badge>
                    {campaign.isConfigured ? "真实链接已配置" : "待配置联盟链接"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary">
                    {campaign.provider}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">
                    {campaign.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {campaign.description}
                  </p>
                </div>
                <div className="grid gap-2 text-sm">
                  <p className="flex items-center gap-2">
                    <TrendingUp
                      className="h-4 w-4 text-primary"
                      aria-hidden="true"
                    />
                    {campaign.commissionLabel}
                  </p>
                  <p className="text-muted-foreground">
                    {campaign.productCategory}
                  </p>
                  <p className="font-medium">预计 ¥{estimatedCommission} / 单</p>
                </div>
                <Button asChild variant="outline">
                  <a
                    href={getTrackedAdHref(campaign, source)}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                  >
                    <BadgePercent className="h-4 w-4" aria-hidden="true" />
                    查看推广页
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </Card>
            );
          })}

          <Card
            className="grid gap-4 border-primary/20 p-5"
            data-testid="adsense-card"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{adsenseShare}%</Badge>
              <Badge>展示广告</Badge>
              <Badge>{adsenseClient && adsenseSlot ? "已接入" : "待审核配置"}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-primary">Google AdSense</p>
              <h3 className="mt-1 text-lg font-semibold">页面展示广告</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                作为内容流量的补充收入，等站点原创内容和政策页完善后申请，
                通过后填入 AdSense client 和 slot 即可显示真实广告。
              </p>
            </div>
            {adsenseClient && adsenseSlot ? (
              <GoogleAdSenseSlot client={adsenseClient} slot={adsenseSlot} />
            ) : (
              <div className="flex min-h-32 items-center justify-center rounded-md border border-dashed border-border bg-muted text-sm text-muted-foreground">
                <Megaphone className="mr-2 h-4 w-4" aria-hidden="true" />
                AdSense 广告位预留
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
