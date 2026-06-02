import type { Inquiry } from "@/generated/prisma/client";

export async function sendInquiryNotifications(inquiry: Inquiry) {
  if (!process.env.RESEND_API_KEY) {
    console.info(
      `[email:fallback] inquiry ${inquiry.id} for ${inquiry.email} was created; RESEND_API_KEY is not configured.`,
    );
    return;
  }

  console.info(
    `[email:stub] inquiry ${inquiry.id} is ready for Resend integration.`,
  );
}
