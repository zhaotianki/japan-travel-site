import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { TravelAdSlot } from "@/components/ads/travel-ad-slot";
import { InteractiveJapanMap } from "@/components/home/interactive-japan-map";
import { PageShell } from "@/components/layout/site-shell";
import { SearchForm } from "@/components/search/search-form";
import { ExperienceCard } from "@/components/search/experience-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getHomeData } from "@/lib/data";
import { formatCurrency } from "@/lib/format";
import { splitList } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { destinations, routes, highlights } = await getHomeData();

  return (
    <PageShell>
      <section className="relative min-h-[680px] overflow-hidden bg-foreground text-white">
        <img
          src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=2200&q=80"
          alt="日本街区与旅行目的地"
          className="absolute inset-0 h-full w-full object-cover opacity-72"
        />
        <div className="absolute inset-0 bg-black/42" />
        <div className="relative mx-auto flex min-h-[680px] w-full max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="border-white/30 bg-white/14 text-white backdrop-blur">
              日本目的地 · 行程规划 · 旅行询单
            </Badge>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
              日本自由行规划
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/88">
              搜索城市、主题、日期和同行人数，把想去的体验加入行程，保存后发给旅行顾问询价。
            </p>
          </div>
          <div className="mt-10 max-w-6xl">
            <SearchForm />
          </div>
          <div className="mt-8 grid gap-3 text-sm text-white/90 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              东京、京都、大阪、北海道、冲绳
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              按天组织、预算汇总、分享链接
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              先询单确认，不接真实库存
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            ["20+", "精选体验"],
            ["5", "目的地路线"],
            ["8", "筛选维度"],
            ["0", "真实支付接入"],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="text-3xl font-semibold">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <InteractiveJapanMap />

      <TravelAdSlot source="home" />

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">按地区发现</p>
            <h2 className="mt-2 text-3xl font-semibold">热门目的地</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/search">
              查看全部
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {destinations.slice(0, 5).map((destination) => (
            <Link
              key={destination.id}
              href={`/destinations/${destination.slug}`}
              className="group overflow-hidden rounded-md border border-border bg-card"
            >
              <img
                src={destination.coverImage}
                alt={destination.name}
                className="h-44 w-full object-cover transition group-hover:scale-105"
              />
              <div className="grid gap-2 p-4">
                <p className="text-xs font-medium text-primary">
                  {destination.region}
                </p>
                <h3 className="font-semibold">{destination.name}</h3>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {destination.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-muted">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold text-primary">推荐路线</p>
            <h2 className="mt-2 text-3xl font-semibold">可直接改成询单草案</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {routes.map((route) => (
              <Card key={route.id} className="overflow-hidden">
                <img
                  src={route.heroImage}
                  alt={route.title}
                  className="h-48 w-full object-cover"
                />
                <div className="grid gap-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {route.destination.name} · {route.days} 天
                      </p>
                      <h3 className="text-lg font-semibold">{route.title}</h3>
                    </div>
                    <Badge>{formatCurrency(route.budget)}</Badge>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {route.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {splitList(route.themes).map((theme) => (
                      <Badge key={theme}>{theme}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-primary">深度主题</p>
            <h2 className="mt-2 text-3xl font-semibold">本月适合加入行程</h2>
          </div>
        </div>
        <div className="grid gap-5">
          {highlights.slice(0, 3).map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
