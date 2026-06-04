import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  issueType?: string;
  title?: string;
  details?: string;
  evidenceUrl?: string;
  company?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "提交内容不是有效 JSON。" }, { status: 400 });
  }

  if (clean(payload.company)) {
    return NextResponse.json({ message: "提交已接收。" });
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const issueType = clean(payload.issueType);
  const title = clean(payload.title);
  const details = clean(payload.details);
  const evidenceUrl = clean(payload.evidenceUrl);

  if (name.length < 2 || title.length < 6 || details.length < 40 || !isEmail(email) || !issueType) {
    return NextResponse.json({ message: "请填写姓名、有效邮箱、问题类型、标题和完整操作过程。" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "AI教程问题提交 <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return NextResponse.json(
      { message: "邮件发送未配置：请在服务器环境变量中设置 RESEND_API_KEY 和 CONTACT_TO_EMAIL。" },
      { status: 503 }
    );
  }

  const text = [
    `姓名：${name}`,
    `邮箱：${email}`,
    `问题类型：${issueType}`,
    `标题：${title}`,
    evidenceUrl ? `相关链接或截图位置：${evidenceUrl}` : "",
    "",
    "真实操作过程：",
    details
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `网站问题提交：${title}`,
      text
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json({ message: `邮件服务发送失败：${errorText}` }, { status: 502 });
  }

  return NextResponse.json({ message: "问题已发送到站长邮箱。" });
}
