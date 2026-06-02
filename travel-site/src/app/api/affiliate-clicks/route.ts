import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdCampaign, getEstimatedCommission } from "@/lib/ad-campaigns";
import { getPrisma } from "@/lib/db";
import { createFallbackAffiliateClick } from "@/lib/fallback-runtime";

const affiliateClickSchema = z.object({
  campaign: z.string().min(1),
  source: z.string().trim().min(1).max(80).default("home"),
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = affiliateClickSchema.safeParse({
    campaign: url.searchParams.get("campaign") ?? "",
    source: url.searchParams.get("source") ?? "home",
  });

  if (!parsed.success) {
    return NextResponse.redirect(new URL("/", url.origin));
  }

  const campaign = getAdCampaign(parsed.data.campaign);
  if (!campaign) {
    return NextResponse.redirect(new URL("/", url.origin));
  }

  const click = {
    campaignId: campaign.id,
    provider: campaign.provider,
    href: campaign.href,
    source: parsed.data.source,
    referrer: request.headers.get("referer"),
    userAgent: request.headers.get("user-agent"),
    estimatedCommissionCny: getEstimatedCommission(campaign),
  };

  try {
    await getPrisma().affiliateClick.create({ data: click });
  } catch (error) {
    createFallbackAffiliateClick(click);
    console.error("[affiliate-clicks] storing click failed", error);
  }

  return NextResponse.redirect(campaign.href);
}
