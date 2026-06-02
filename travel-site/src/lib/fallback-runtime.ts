import { randomUUID } from "node:crypto";
import {
  fallbackDestinations,
  fallbackExperiences,
  fallbackPlaces,
} from "@/lib/fallback-data";
import { splitList } from "@/lib/utils";
import type { ItineraryCreateInput, InquiryInput } from "@/lib/validations";

type RuntimeExperience = (typeof fallbackExperiences)[number] & {
  destination: (typeof fallbackDestinations)[number];
  place: (typeof fallbackPlaces)[number] | null;
};

type RuntimeAffiliateClick = {
  id: string;
  campaignId: string;
  provider: string;
  href: string;
  source: string;
  referrer: string | null;
  userAgent: string | null;
  estimatedCommissionCny: number;
  createdAt: Date;
};

type RuntimeItinerary = {
  id: string;
  title: string;
  destinationId: string | null;
  startDate: Date | null;
  daysCount: number;
  partySize: number;
  budget: number;
  shareToken: string;
  contactEmail: string | null;
  createdAt: Date;
  updatedAt: Date;
  destination: (typeof fallbackDestinations)[number] | null;
  days: Array<{
    id: string;
    itineraryId: string;
    dayIndex: number;
    date: Date | null;
    notes: string | null;
    items: Array<{
      id: string;
      dayId: string;
      type: string;
      refId: string | null;
      experienceId: string | null;
      startTime: string;
      endTime: string;
      priceEstimate: number;
      sortOrder: number;
      notes: string | null;
      experience: RuntimeExperience | null;
    }>;
  }>;
  inquiries: Array<{
    id: string;
    itineraryId: string | null;
    name: string;
    email: string;
    phone: string;
    partySize: number;
    travelDate: Date | null;
    budget: number | null;
    notes: string | null;
    status: string;
    createdAt: Date;
  }>;
};

const globalStore = globalThis as unknown as {
  fallbackItineraries?: Map<string, RuntimeItinerary>;
  fallbackInquiries?: RuntimeItinerary["inquiries"];
  fallbackAffiliateClicks?: RuntimeAffiliateClick[];
};

function itineraries() {
  globalStore.fallbackItineraries ??= new Map();
  return globalStore.fallbackItineraries;
}

function inquiries() {
  globalStore.fallbackInquiries ??= [];
  return globalStore.fallbackInquiries;
}

function affiliateClicks() {
  globalStore.fallbackAffiliateClicks ??= [];
  return globalStore.fallbackAffiliateClicks;
}

function toDate(value?: string) {
  return value ? new Date(`${value}T00:00:00`) : null;
}

function addDays(date: Date | null, days: number) {
  if (!date) return null;
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

function token() {
  return randomUUID().replaceAll("-", "").slice(0, 12);
}

export function fallbackExperienceRows() {
  return fallbackExperiences.map((experience) => {
    const destination = fallbackDestinations.find(
      (item) => item.id === experience.destinationId,
    )!;
    const place =
      fallbackPlaces.find((item) => item.id === experience.placeId) ?? null;
    return { ...experience, destination, place };
  });
}

export function getFallbackExperience(id: string) {
  return (
    fallbackExperienceRows().find(
      (experience) => experience.id === id || experience.slug === id,
    ) ?? null
  );
}

export function createFallbackItinerary(data: ItineraryCreateInput) {
  const id = `demo_${randomUUID().replaceAll("-", "").slice(0, 12)}`;
  const shareToken = token();
  const startDate = toDate(data.startDate);
  const budget = data.items.reduce(
    (sum, item) => sum + item.priceEstimate * data.partySize,
    0,
  );
  const firstExperience = data.items[0]
    ? getFallbackExperience(data.items[0].experienceId)
    : null;
  const destinationId =
    data.destinationId || firstExperience?.destinationId || null;
  const destination =
    fallbackDestinations.find((item) => item.id === destinationId) ?? null;

  const itinerary: RuntimeItinerary = {
    id,
    title: data.title,
    destinationId,
    startDate,
    daysCount: data.daysCount,
    partySize: data.partySize,
    budget,
    shareToken,
    contactEmail: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    destination,
    days: Array.from({ length: data.daysCount }, (_, index) => {
      const dayIndex = index + 1;
      const dayId = `${id}_day_${dayIndex}`;
      return {
        id: dayId,
        itineraryId: id,
        dayIndex,
        date: addDays(startDate, index),
        notes: null,
        items: data.items
          .filter((item) => item.dayIndex === dayIndex)
          .map((item) => {
            const experience = getFallbackExperience(item.experienceId);
            return {
              id: `${dayId}_${item.sortOrder}`,
              dayId,
              type: "experience",
              refId: item.experienceId,
              experienceId: item.experienceId,
              startTime: item.startTime,
              endTime: item.endTime,
              priceEstimate: item.priceEstimate,
              sortOrder: item.sortOrder,
              notes: item.notes ?? null,
              experience,
            };
          }),
      };
    }),
    inquiries: [],
  };

  itineraries().set(id, itinerary);
  return itinerary;
}

export function updateFallbackItinerary(id: string, data: ItineraryCreateInput) {
  const existing = createFallbackItinerary(data);
  const updated = { ...existing, id, shareToken: getFallbackItinerary(id)?.shareToken ?? existing.shareToken };
  itineraries().set(id, updated);
  return updated;
}

export function getFallbackItinerary(id: string) {
  return itineraries().get(id) ?? null;
}

export function getFallbackSharedItinerary(shareToken: string) {
  return (
    Array.from(itineraries().values()).find(
      (itinerary) => itinerary.shareToken === shareToken,
    ) ?? null
  );
}

export function createFallbackInquiry(data: InquiryInput) {
  const inquiry = {
    id: `inq_${randomUUID().replaceAll("-", "").slice(0, 12)}`,
    itineraryId: data.itineraryId || null,
    name: data.name,
    email: data.email,
    phone: data.phone,
    partySize: data.partySize,
    travelDate: toDate(data.travelDate),
    budget: data.budget ?? null,
    notes: data.notes ?? null,
    status: "new",
    createdAt: new Date(),
  };
  inquiries().unshift(inquiry);
  const itinerary = data.itineraryId ? getFallbackItinerary(data.itineraryId) : null;
  itinerary?.inquiries.unshift(inquiry);
  console.info("[fallback-runtime] Inquiry stored in volatile memory", {
    id: inquiry.id,
    traveler: inquiry.name,
    themes: splitList(inquiry.notes),
  });
  return inquiry;
}

export function getFallbackInquiries() {
  return inquiries();
}

export function createFallbackAffiliateClick(
  data: Omit<RuntimeAffiliateClick, "id" | "createdAt">,
) {
  const click = {
    id: `clk_${randomUUID().replaceAll("-", "").slice(0, 12)}`,
    ...data,
    createdAt: new Date(),
  };
  affiliateClicks().unshift(click);
  return click;
}

export function getFallbackAffiliateClicks() {
  return affiliateClicks();
}
