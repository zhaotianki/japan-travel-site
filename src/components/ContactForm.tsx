"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle, Send, XCircle } from "lucide-react";

type ContactFormProps = {
  compact?: boolean;
  onSuccess?: () => void;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

const issueTypes = ["Codex", "Claude Code", "ChatGPT", "MCP", "Agent", "Github", "Vercel", "AdSense", "其他"];

export function ContactForm({ compact = false, onSuccess }: ContactFormProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "提交失败，请稍后重试。");
      }

      form.reset();
      setState("success");
      setMessage(result.message || "问题已发送。");
      onSuccess?.();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "提交失败，请稍后重试。");
    }
  }

  return (
    <form className={compact ? "contact-form compact" : "contact-form"} onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>姓名</span>
          <input name="name" type="text" autoComplete="name" required minLength={2} maxLength={60} />
        </label>
        <label>
          <span>邮箱</span>
          <input name="email" type="email" autoComplete="email" required maxLength={120} />
        </label>
      </div>
      <label>
        <span>问题类型</span>
        <select name="issueType" required defaultValue="">
          <option value="" disabled>
            选择一个分类
          </option>
          {issueTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>问题标题</span>
        <input
          name="title"
          type="text"
          required
          minLength={6}
          maxLength={120}
          placeholder="例如：Mac 安装 Codex 后无法登录"
        />
      </label>
      <label>
        <span>真实操作过程</span>
        <textarea
          name="details"
          required
          minLength={40}
          maxLength={5000}
          rows={compact ? 5 : 8}
          placeholder="请写清楚系统版本、执行过的命令、报错内容、截图位置、已经尝试过的解决方法。"
        />
      </label>
      <label>
        <span>相关链接或截图位置</span>
        <input
          name="evidenceUrl"
          type="text"
          maxLength={500}
          placeholder="例如：截图文件名、GitHub 链接、Vercel 部署链接、官方文档链接"
        />
      </label>
      <input name="company" type="text" tabIndex={-1} autoComplete="off" className="honeypot" />
      <div className="form-actions">
        <button type="submit" className="contact-button" disabled={state === "submitting"}>
          {state === "submitting" ? (
            <LoaderCircle size={18} aria-hidden="true" className="spin" />
          ) : (
            <Send size={18} aria-hidden="true" />
          )}
          {state === "submitting" ? "发送中" : "发送到站长邮箱"}
        </button>
        {message ? (
          <p className={`form-status ${state}`}>
            {state === "success" ? <CheckCircle2 size={16} aria-hidden="true" /> : null}
            {state === "error" ? <XCircle size={16} aria-hidden="true" /> : null}
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
