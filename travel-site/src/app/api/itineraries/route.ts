import { randomUUID } from "node:crypto";
import { getPrisma } from "@/lib/db";
import { createFallbackItinerary } from "@/lib/fallback-runtime";
import { itineraryCreateSchema } from "@/lib/validations";

function toDate(value?: string) {
  return value ? new Date(`${value}T00:00:00`) : undefined;
}

function shareToken() {
  return randomUUID().replaceAll("-", "").slice(0, 12);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = itineraryCreateSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const budget = data.items.reduce(
    (sum, item) => sum + item.priceEstimate * data.partySize,
    0,
  );

  try {
    const db = getPrisma();
    const itinerary = await db.itinerary.create({
      data: {
        title: data.title,
        destinationId: data.destinationId || undefined,
        startDate: toDate(data.startDate),
        daysCount: data.daysCount,
        partySize: data.partySize,
        budget,
        shareToken: shareToken(),
        days: {
          create: Array.from({ length: data.daysCount }, (_, index) => {
            const dayIndex = index + 1;
            return {
              dayIndex,
              date: data.startDate
                ? new Date(
                    new Date(`${data.startDate}T00:00:00`).getTime() +
                      index * 24 * 60 * 60 * 1000,
                  )
                : undefined,
              items: {
                create: data.items
                  .filter((item) => item.dayIndex === dayIndex)
                  .map((item) => ({
                    type: "experience",
                    refId: item.experienceId,
                    experienceId: item.experienceId,
                    startTime: item.startTime,
                    endTime: item.endTime,
                    priceEstimate: item.priceEstimate,
                    sortOrder: item.sortOrder,
                    notes: item.notes,
                  })),
              },
            };
          }),
        },
      },
    });

    return Response.json({ id: itinerary.id, shareToken: itinerary.shareToken });
  } catch (error) {
    console.error("[api/itineraries] Database write failed; using fallback", error);
    const itinerary = createFallbackItinerary(data);
    return Response.json({
      id: itinerary.id,
      shareToken: itinerary.shareToken,
      volatile: true,
    });
  }
}
