# AI实战安装教程与Agent知识库

中文主站的 AI 实战安装教程与 Agent 知识库，使用 Next.js App Router、React 和 TypeScript。

Production URL: https://codex-global-blog.vercel.app

Google AdSense client is configured by default:

```text
ca-pub-3023331294575844
```

## 本地运行

```bash
npm install
npm run dev
```

## 内容规则

- 不发布虚构案例。
- 不把目录条目伪装成正文。
- 已发布正文必须基于真实操作流程。
- 每篇正文必须包含功能介绍、安装前准备、详细步骤、截图位置预留、常见错误、解决方案和 FAQ。

## 商业化配置

复制 `.env.example` 到 `.env.local` 并填写：

- `NEXT_PUBLIC_ADSENSE_CLIENT`
- `NEXT_PUBLIC_ADSENSE_SLOT`
- `NEXT_PUBLIC_CONTACT_URL`
- `NEXT_PUBLIC_AFFILIATE_LINKS`
- `NEXT_PUBLIC_SPONSOR_ADS`

配置 `NEXT_PUBLIC_ADSENSE_CLIENT` 和 `NEXT_PUBLIC_ADSENSE_SLOT` 后，固定广告位会使用 Google AdSense；只配置 client 时仍会加载 AdSense Auto Ads 脚本。

AdSense 需要先通过 Google 审核。面向 EEA、英国、瑞士用户投放广告时，需要使用 Google 认证 CMP 或 AdSense consent message。
