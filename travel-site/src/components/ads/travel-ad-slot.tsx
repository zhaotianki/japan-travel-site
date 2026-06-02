import { BadgePercent, ExternalLink, TrendingUp } from "lucide-react";
import { GoogleAdSenseSlot } from "@/components/ads/google-adsense-slot";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getBestAdCampaign,
  getEstimatedCommission,
} from "@/lib/ad-campaigns";

export function TravelAdSlot() {
  const adsenseClient = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;
  const adsenseSlot = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_HOME_SLOT;
  const campaign = getBestAdCampaign();
  const estimatedCommission = getEstimatedCommission(campaign);

  if (adsenseClient && adsenseSlot) {
    return (
      <section className="bg-background" data-testid="travel-ad-slot">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Card className="grid gap-4 overflow-hidden border-primary/20 bg-card p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>广告区域</Badge>
                <Badge>Google AdSense</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Sponsored</p>
            </div>
            <GoogleAdSenseSlot client={adsenseClient} slot={adsenseSlot} />
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background" data-testid="travel-ad-slot">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Card className="grid gap-5 overflow-hidden border-primary/20 bg-[#102f32] p-6 text-white md:grid-cols-[1fr_auto] md:items-center">
          <div className="grid gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="border-white/20 bg-white/12 text-white">
                广告区域
              </Badge>
              <Badge className="border-white/20 bg-white/12 text-white">
                {campaign.badge}
              </Badge>
            </div>
            <div>
              <p className="flex items-center gap-2 text-sm text-white/70">
                <TrendingUp className="h-4 w-4" aria-hidden="true" />
                按预计佣金排序：约 ¥{estimatedCommission} / 单
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                {campaign.provider} · {campaign.title}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/76">
                {campaign.description}
              </p>
            </div>
          </div>
          <Button asChild className="bg-white text-[#102f32] hover:bg-white/90">
            <a
              href={campaign.href}
              target="_blank"
              rel="sponsored noopener noreferrer"
            >
              <BadgePercent className="h-4 w-4" aria-hidden="true" />
              查看广告落地页
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </Card>
      </div>
    </section>
  );
}
