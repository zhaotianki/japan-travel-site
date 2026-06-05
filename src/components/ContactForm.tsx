"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle, Send, XCircle } from "lucide-react";

type ContactFormProps = {
  compact?: boolean;
  onSuccess?: () => void;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

const issueTypes = ["Codex", "Claude Code", "ChatGPT", "MCP", "Agent", "Github", "Vercel", "Cursor", "Windsurf", "AdSense", "其他"];

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function focusField(form: HTMLFormElement, name: string) {
  const field = form.elements.namedItem(name);

  if (field instanceof HTMLElement) {
    field.focus();
  }
}

export function ContactForm({ compact = false, onSuccess }: ContactFormProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries()) as Record<string, string>;
    const name = payload.name?.trim() ?? "";
    const email = payload.email?.trim() ?? "";
    const issueType = payload.issueType?.trim() ?? "";
    const title = payload.title?.trim() ?? "";
    const details = payload.details?.trim() ?? "";

    setMessage("");

    if (name.length < 2) {
      setState("error");
      setMessage("请填写姓名，至少 2 个字符。");
      focusField(form, "name");
      return;
    }

    if (!isEmail(email)) {
      setState("error");
      setMessage("请填写有效邮箱，方便站长回复你。");
      focusField(form, "email");
      return;
    }

    if (!issueType) {
      setState("error");
      setMessage("请选择问题类型。");
      focusField(form, "issueType");
      return;
    }

    if (title.length < 6) {
      setState("error");
      setMessage("请填写问题标题，至少 6 个字符。");
      focusField(form, "title");
      return;
    }

    if (details.length < 40) {
      setState("error");
      setMessage("请把真实操作过程写完整，至少 40 个字符，包括你看到的报错或已经尝试过的方法。");
      focusField(form, "details");
      return;
    }

    setState("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
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
    <form className={compact ? "contact-form compact" : "contact-form"} onSubmit={handleSubmit} noValidate>
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
          <p className={`form-status ${state}`} role={state === "error" ? "alert" : "status"} aria-live="polite">
            {state === "success" ? <CheckCircle2 size={16} aria-hidden="true" /> : null}
            {state === "error" ? <XCircle size={16} aria-hidden="true" /> : null}
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
