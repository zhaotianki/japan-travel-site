import type { Metadata } from "next";
import { AdUnit } from "@/components/AdUnit";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "实战案例",
  description: "只记录本站真实执行过的安装、部署、提交、广告接入过程。"
};

const records = [
  {
    title: "本站从本地项目部署到 Vercel 生产环境",
    date: "2026-06-04",
    facts: ["本地运行 npm run lint 和 npm run build", "使用 npx vercel link --yes 链接项目", "使用 npx vercel deploy --yes --prod 部署", "生产域名 https://codex-global-blog.vercel.app 返回 200"],
    errors: ["本地目录名 Codex 2 导致默认 Vercel 项目名不合法", "第一次生产 URL 配置仍是 localhost"],
    fixes: ["指定合法项目名 codex-global-blog", "把默认站点 URL 改为生产域名并重新部署"]
  },
  {
    title: "本站 GitHub 独立分支保存流程",
    date: "2026-06-04",
    facts: ["本地创建 commit", "添加 origin 到 zhaotianki/japan-travel-site", "推送到 codex/codex-global-blog 独立分支", "避免覆盖远程 main"],
    errors: ["本地 main 跟踪远程 codex/codex-global-blog，普通 git push 被拒绝"],
    fixes: ["使用 git push origin HEAD:codex/codex-global-blog 显式推送"]
  },
  {
    title: "本站 AdSense 脚本接入记录",
    date: "2026-06-04",
    facts: ["配置 ca-pub-3023331294575844", "layout 加载 Google AdSense 脚本", "ads.txt 根据 publisher ID 输出记录", "部署到 Vercel 生产环境"],
    errors: ["没有广告位 slot 时固定广告位不会渲染单元广告"],
    fixes: ["保留 Auto Ads 脚本加载；固定广告位后续由 AdSense 后台或 slot ID 控制"]
  }
];

export default function CasesPage() {
  return (
    <div className="content-layout">
      <div>
        <header className="page-header">
          <div className="eyebrow">
            <span>真实记录</span>
            <span>不虚构案例</span>
            <span>可复查命令</span>
          </div>
          <h1>实战案例</h1>
          <p>这里只记录本站真实发生过的操作过程、错误和修复方法，不收录未经验证的成功故事。</p>
        </header>
        <AdUnit placement="content-top" variant="leaderboard" label="实战案例广告" />
        <div className="case-list">
          {records.map((record) => (
            <article key={record.title} className="case-row">
              <div>
                <div className="meta-row">
                  <span>{record.date}</span>
                  <span>真实操作</span>
                </div>
                <h3>{record.title}</h3>
                <h4>实际步骤</h4>
                <ul className="plain-list">
                  {record.facts.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <h4>遇到错误</h4>
                <ul className="plain-list">
                  {record.errors.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <h4>解决方案</h4>
                <ul className="plain-list">
                  {record.fixes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Sidebar />
    </div>
  );
}
