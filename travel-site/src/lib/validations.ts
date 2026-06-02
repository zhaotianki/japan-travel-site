import { z } from "zod";

const emptyToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

const optionalText = z.preprocess(
  emptyToUndefined,
  z.string().trim().optional(),
);

const optionalNumber = z.preprocess(
  emptyToUndefined,
  z.coerce.number().optional(),
);

const optionalDate = optionalText;

export const searchSchema = z.object({
  destination: optionalText,
  date: optionalDate,
  partySize: optionalNumber.pipe(z.number().int().min(1).max(20).optional()),
  budgetMin: optionalNumber.pipe(z.number().int().min(0).optional()),
  budgetMax: optionalNumber.pipe(z.number().int().min(0).optional()),
  theme: optionalText,
  duration: optionalText,
  language: optionalText,
  includesMeal: z.preprocess(
    emptyToUndefined,
    z.enum(["true", "false"]).optional(),
  ),
  rating: optionalNumber.pipe(z.number().min(0).max(5).optional()),
  sort: z.preprocess(
    emptyToUndefined,
    z.enum(["recommended", "price", "rating", "duration"]).optional(),
  ),
});

export type SearchFilters = z.infer<typeof searchSchema>;

export const itineraryItemSchema = z.object({
  experienceId: z.string().min(1),
  dayIndex: z.coerce.number().int().min(1).max(14),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  priceEstimate: z.coerce.number().int().min(0),
  sortOrder: z.coerce.number().int().min(0).default(0),
  notes: z.string().optional(),
});

export const itineraryCreateSchema = z.object({
  title: z.string().trim().min(2).max(80),
  destinationId: z.string().optional(),
  startDate: optionalDate,
  partySize: z.coerce.number().int().min(1).max(20),
  daysCount: z.coerce.number().int().min(1).max(14),
  items: z.array(itineraryItemSchema).min(1),
});

export type ItineraryCreateInput = z.infer<typeof itineraryCreateSchema>;

export const inquirySchema = z.object({
  itineraryId: z.string().optional(),
  name: z.string().trim().min(2).max(40),
  email: z.string().trim().email(),
  phone: z.string().trim().min(6).max(30),
  partySize: z.coerce.number().int().min(1).max(50),
  travelDate: optionalDate,
  budget: z.coerce.number().int().min(0).optional(),
  notes: z.string().trim().max(1000).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const destinationAdminSchema = z.object({
  name: z.string().trim().min(2),
  slug: z.string().trim().min(2).regex(/^[a-z0-9-]+$/),
  region: z.string().trim().min(2),
  summary: z.string().trim().min(8),
  description: z.string().trim().min(20),
  season: z.string().trim().min(2),
  budgetMin: z.coerce.number().int().min(0),
  budgetMax: z.coerce.number().int().min(0),
  coverImage: z.string().trim().url(),
  featured: z.coerce.boolean().optional(),
});

export const experienceAdminSchema = z.object({
  destinationId: z.string().min(1),
  title: z.string().trim().min(2),
  slug: z.string().trim().min(2).regex(/^[a-z0-9-]+$/),
  summary: z.string().trim().min(8),
  description: z.string().trim().min(20),
  priceFrom: z.coerce.number().int().min(0),
  durationHours: z.coerce.number().min(0.5),
  difficulty: z.string().trim().min(1),
  language: z.string().trim().min(1),
  includesMeal: z.coerce.boolean().optional(),
  cancellationPolicy: z.string().trim().min(2),
  rating: z.coerce.number().min(0).max(5),
  reviewCount: z.coerce.number().int().min(0),
  audience: z.string().trim().min(1),
  themes: z.string().trim().min(1),
  startTime: z.string().trim().min(1),
  meetingPoint: z.string().trim().min(2),
  restrictions: z.string().trim().min(2),
  includes: z.string().trim().min(2),
  excludes: z.string().trim().min(2),
  coverImage: z.string().trim().url(),
});
