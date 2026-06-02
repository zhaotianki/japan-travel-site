import { PageShell } from "@/components/layout/site-shell";
import { ItineraryBuilder } from "@/components/itinerary/itinerary-builder";
import { getDestinations, getExperienceOptions } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function NewItineraryPage() {
  const [experiences, destinations] = await Promise.all([
    getExperienceOptions(),
    getDestinations(),
  ]);

  return (
    <PageShell>
      <section className="border-b border-border bg-card">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-primary">行程规划器</p>
          <h1 className="mt-2 text-3xl font-semibold">按天整理你的日本旅行</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            从详情页加入的项目会自动出现在草案里，也可以从右侧列表继续添加。
          </p>
        </div>
      </section>
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ItineraryBuilder experiences={experiences} destinations={destinations} />
      </section>
    </PageShell>
  );
}
