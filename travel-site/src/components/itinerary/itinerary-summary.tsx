import Link from "next/link";
import { CalendarDays, ExternalLink, Mail, MapPin, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/format";
import type { getItinerary, getSharedItinerary } from "@/lib/data";

type Itinerary =
  | NonNullable<Awaited<ReturnType<typeof getItinerary>>>
  | NonNullable<Awaited<ReturnType<typeof getSharedItinerary>>>;

export function ItinerarySummary({
  itinerary,
  readOnly = false,
}: {
  itinerary: Itinerary;
  readOnly?: boolean;
}) {
  const total = itinerary.days.reduce(
    (sum, day) =>
      sum +
      day.items.reduce(
        (daySum, item) =>
          daySum + item.priceEstimate * Math.max(1, itinerary.partySize),
        0,
      ),
    0,
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="grid gap-5">
        {itinerary.days.map((day) => (
          <section key={day.id} className="grid gap-3">
            <h2 className="inline-flex items-center gap-2 text-xl font-semibold">
              <CalendarDays className="h-5 w-5" aria-hidden="true" />
              Day {day.dayIndex}
            </h2>
            {day.items.length ? (
              day.items.map((item) => (
                <Card key={item.id} className="grid gap-4 p-4 md:grid-cols-[120px_1fr]">
                  {item.experience ? (
                    <img
                      src={item.experience.coverImage}
                      alt={item.experience.title}
                      className="h-28 w-full rounded-md object-cover md:h-full"
                    />
                  ) : (
                    <div className="h-28 rounded-md bg-muted" />
                  )}
                  <div className="grid gap-3">
                    <div className="flex flex-wrap justify-between gap-3">
                      <div>
                        <p className="font-semibold">
                          {item.experience?.title ?? "自定义项目"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.startTime} - {item.endTime} ·{" "}
                          {formatCurrency(item.priceEstimate)} / 人
                        </p>
                      </div>
                      <Badge>{item.type}</Badge>
                    </div>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {item.experience?.meetingPoint ?? "地点待确认"}
                    </p>
                    {item.notes ? (
                      <p className="text-sm text-muted-foreground">
                        {item.notes}
                      </p>
                    ) : null}
                    {item.experience ? (
                      <Button asChild variant="outline" size="sm" className="w-fit">
                        <Link href={`/experiences/${item.experience.slug}`}>
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                          体验详情
                        </Link>
                      </Button>
                    ) : null}
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-5 text-sm text-muted-foreground">
                暂无项目。
              </Card>
            )}
          </section>
        ))}
      </div>

      <aside className="grid h-fit gap-4 lg:sticky lg:top-24">
        <Card className="grid gap-4 p-5">
          <div>
            <p className="text-sm text-muted-foreground">行程预算</p>
            <p className="mt-1 text-3xl font-semibold">
              {formatCurrency(total)}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatDate(itinerary.startDate)} · {itinerary.partySize} 人 ·{" "}
              {itinerary.daysCount} 天
            </p>
          </div>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <p>目的地：{itinerary.destination?.name ?? "待确认"}</p>
            <p>分享码：{itinerary.shareToken}</p>
          </div>
          {!readOnly ? (
            <div className="grid gap-2">
              <Button asChild>
                <Link href={`/inquiry?itineraryId=${itinerary.id}`}>
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  提交询单
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/share/${itinerary.shareToken}`}>
                  <Share2 className="h-4 w-4" aria-hidden="true" />
                  打开分享页
                </Link>
              </Button>
            </div>
          ) : null}
        </Card>
      </aside>
    </div>
  );
}
