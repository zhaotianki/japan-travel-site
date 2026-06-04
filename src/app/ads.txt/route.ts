import { getAdSenseClient } from "@/lib/site";

export const dynamic = "force-dynamic";

export function GET() {
  const client = getAdSenseClient();
  const publisherId = client.replace("ca-pub-", "pub-");
  const body = publisherId
    ? `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`
    : "# Configure NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx before enabling AdSense.\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
