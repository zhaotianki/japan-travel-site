import { PageShell } from "@/components/layout/site-shell";
import { InquiryForm } from "@/components/itinerary/inquiry-form";
import { Card } from "@/components/ui/card";
import { getItinerary } from "@/lib/data";
import { formatCurrency } from "@/lib/format";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function InquiryPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const itineraryId = first(params.itineraryId);
  const itinerary = itineraryId ? await getItinerary(itineraryId) : null;
  const total =
    itinerary?.days.reduce(
      (sum, day) =>
        sum +
        day.items.reduce(
          (itemSum, item) =>
            itemSum + item.priceEstimate * Math.max(1, itinerary.partySize),
          0,
        ),
      0,
    ) ?? 0;

  return (
    <PageShell>
      <section className="border-b border-border bg-card">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-primary">旅行询单</p>
          <h1 className="mt-2 text-3xl font-semibold">发给旅行顾问确认报价</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            提交后会生成后台待处理记录。MVP 不接真实库存和支付，顾问会二次确认价格、日期和限制。
          </p>
        </div>
      </section>
      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <Card className="p-6">
          <InquiryForm itineraryId={itineraryId} />
        </Card>
        <aside className="h-fit lg:sticky lg:top-24">
          <Card className="grid gap-3 p-5">
            <p className="font-semibold">询单摘要</p>
            {itinerary ? (
              <>
                <p className="text-sm text-muted-foreground">
                  {itinerary.title}
                </p>
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="rounded-md bg-muted p-3">
                    <p className="font-semibold">{itinerary.daysCount}</p>
                    <p className="text-muted-foreground">天</p>
                  </div>
                  <div className="rounded-md bg-muted p-3">
                    <p className="font-semibold">{itinerary.partySize}</p>
                    <p className="text-muted-foreground">人</p>
                  </div>
                  <div className="rounded-md bg-muted p-3">
                    <p className="font-semibold">
                      {itinerary.days.reduce(
                        (count, day) => count + day.items.length,
                        0,
                      )}
                    </p>
                    <p className="text-muted-foreground">项</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  体验预算：{formatCurrency(total)}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                可以不绑定行程直接提交需求。
              </p>
            )}
          </Card>
        </aside>
      </section>
    </PageShell>
  );
}
