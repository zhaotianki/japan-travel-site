import Link from "next/link";
import { MapPin, Menu, PlaneTakeoff } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/search", label: "搜索体验" },
  { href: "/itinerary/new", label: "行程规划" },
  { href: "/inquiry", label: "提交询单" },
  { href: "/admin", label: "后台" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <PlaneTakeoff className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>旅日计划</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Button asChild variant="ghost" size="sm" key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>
        <Button asChild size="sm" className="hidden md:inline-flex">
          <Link href="/search">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            开始规划
          </Link>
        </Button>
        <Button asChild variant="outline" size="icon" className="md:hidden">
          <Link href="/search" aria-label="打开搜索">
            <Menu className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 text-sm text-muted-foreground sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-semibold text-foreground">旅日计划</p>
          <p className="mt-2 max-w-xl">
            原创日本旅行规划 MVP。当前版本使用种子数据与轻询单流程，价格和库存需由旅行顾问二次确认。
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground">实用入口</p>
          <div className="mt-2 grid gap-2">
            <Link href="/search" className="hover:text-foreground">
              搜索体验
            </Link>
            <Link href="/itinerary/new" className="hover:text-foreground">
              行程规划
            </Link>
            <Link href="/inquiry" className="hover:text-foreground">
              询价咨询
            </Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-foreground">服务说明</p>
          <p className="mt-2">
            地图、邮件和后台密码均通过环境变量配置；缺少 Mapbox token 时自动显示文本地点信息。
          </p>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
