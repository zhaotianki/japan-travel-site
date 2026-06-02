import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/site-shell";
import { ItinerarySummary } from "@/components/itinerary/itinerary-summary";
import { getSharedItinerary } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function SharePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const itinerary = await getSharedItinerary(token);
  if (!itinerary) notFound();

  return (
    <PageShell>
      <section className="border-b border-border bg-card">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-primary">公开分享行程</p>
          <h1 className="mt-2 text-3xl font-semibold">{itinerary.title}</h1>
        </div>
      </section>
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ItinerarySummary itinerary={itinerary} readOnly />
      </section>
    </PageShell>
  );
}
