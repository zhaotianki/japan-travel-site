import { sendInquiryNotifications } from "@/lib/email";
import { getPrisma } from "@/lib/db";
import { createFallbackInquiry } from "@/lib/fallback-runtime";
import { inquirySchema } from "@/lib/validations";

function toDate(value?: string) {
  return value ? new Date(`${value}T00:00:00`) : undefined;
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 },
    );
  }

  const data = parsed.data;
  try {
    const inquiry = await getPrisma().inquiry.create({
      data: {
        itineraryId: data.itineraryId || undefined,
        name: data.name,
        email: data.email,
        phone: data.phone,
        partySize: data.partySize,
        travelDate: toDate(data.travelDate),
        budget: data.budget,
        notes: data.notes,
        status: "new",
      },
    });

    await sendInquiryNotifications(inquiry);
    return Response.json({ id: inquiry.id });
  } catch (error) {
    console.error("[api/inquiries] Database write failed; using fallback", error);
    const inquiry = createFallbackInquiry(data);
    await sendInquiryNotifications(inquiry);
    return Response.json({ id: inquiry.id, volatile: true });
  }
}
