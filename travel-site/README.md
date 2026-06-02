# 旅日计划

日本旅游规划与询单网站 MVP。第一版使用 Next.js、React、TypeScript、Tailwind CSS、Prisma 7 和 SQLite，覆盖首页搜索、结果筛选、体验详情、地图 fallback、行程规划、分享、询单和最小后台 CMS。

## Getting Started

安装依赖后生成 Prisma client、同步数据库并导入种子数据：

```bash
npm run prisma:generate
npm run db:push
npm run db:seed
```

启动开发服务器：

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

本地后台地址是 `/admin`。如果未配置 `ADMIN_PASSWORD`，默认密码为 `admin123`。

## Scripts

- `npm run lint`
- `npm run build`
- `npm run test:e2e`
- `npm run db:push`
- `npm run db:seed`
- `npm run db:reset`

## Environment

参考 `.env.example`：

```bash
DATABASE_URL="file:./prisma/dev.db"
NEXT_PUBLIC_MAPBOX_TOKEN=""
ADMIN_PASSWORD="admin123"
AUTH_SECRET="replace-with-a-long-random-string"
RESEND_API_KEY=""
```

没有 `NEXT_PUBLIC_MAPBOX_TOKEN` 时，页面会显示文本地点 fallback；没有 `RESEND_API_KEY` 时，询单邮件会写日志，不阻断提交。

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
