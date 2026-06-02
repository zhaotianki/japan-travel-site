import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "旅日计划 | 日本自由行规划与询单",
    template: "%s | 旅日计划",
  },
  description:
    "面向中国游客的日本自由行规划工具，支持目的地搜索、体验筛选、行程保存、分享与旅行顾问询单。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
