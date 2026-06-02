import { getPrisma } from "@/lib/db";
import {
  fallbackDestinations,
  fallbackPlaces,
  fallbackReviewLinks,
  fallbackRouteTemplates,
} from "@/lib/fallback-data";
import {
  fallbackExperienceRows,
  getFallbackInquiries,
  getFallbackItinerary,
  getFallbackSharedItinerary,
} from "@/lib/fallback-runtime";
import type { SearchFilters } from "@/lib/validations";
import { splitList } from "@/lib/utils";

export type ExperienceCardData = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  priceFrom: number;
  durationHours: number;
  difficulty: string;
  language: string;
  includesMeal: boolean;
  cancellationPolicy: string;
  rating: number;
  reviewCount: number;
  audience: string[];
  themes: string[];
  startTime: string;
  meetingPoint: string;
  coverImage: string;
  destinationName: string;
  destinationSlug: string;
  placeName?: string;
  lat?: number;
  lng?: number;
};

export type ExperienceDetailData = ExperienceCardData & {
  description: string;
  restrictions: string;
  includes: string[];
  excludes: string[];
  reviewLinks: {
    provider: string;
    rating: number;
    url: string;
  }[];
};

function normalize(value?: string | null) {
  return (value ?? "").trim().toLowerCase();
}

async function readWithFallback<T>(
  label: string,
  operation: () => Promise<T>,
  fallback: () => T,
) {
  try {
    return await operation();
  } catch (error) {
    console.error(`[data] ${label} failed; using fallback data`, error);
    return fallback();
  }
}

function toExperienceCard(experience: {
  id: string;
  slug: string;
  title: string;
  summary: string;
  priceFrom: number;
  durationHours: number;
  difficulty: string;
  language: string;
  includesMeal: boolean;
  cancellationPolicy: string;
  rating: number;
  reviewCount: number;
  audience: string;
  themes: string;
  startTime: string;
  meetingPoint: string;
  coverImage: string;
  destination: { name: string; slug: string };
  place?: { name: string; lat: number | null; lng: number | null } | null;
}): ExperienceCardData {
  return {
    id: experience.id,
    slug: experience.slug,
    title: experience.title,
    summary: experience.summary,
    priceFrom: experience.priceFrom,
    durationHours: experience.durationHours,
    difficulty: experience.difficulty,
    language: experience.language,
    includesMeal: experience.includesMeal,
    cancellationPolicy: experience.cancellationPolicy,
    rating: experience.rating,
    reviewCount: experience.reviewCount,
    audience: splitList(experience.audience),
    themes: splitList(experience.themes),
    startTime: experience.startTime,
    meetingPoint: experience.meetingPoint,
    coverImage: experience.coverImage,
    destinationName: experience.destination.name,
    destinationSlug: experience.destination.slug,
    placeName: experience.place?.name,
    lat: experience.place?.lat ?? undefined,
    lng: experience.place?.lng ?? undefined,
  };
}

function fallbackRouteRows() {
  return fallbackRouteTemplates.map((route) => {
    const destination = fallbackDestinations.find(
      (item) => item.id === route.destinationId,
    )!;
    return { ...route, destination };
  });
}

function searchFallbackRows(filters: SearchFilters) {
  let items = fallbackExperienceRows().map(toExperienceCard);
  const destination = normalize(filters.destination);
  const theme = normalize(filters.theme);
  const language = normalize(filters.language);

  if (destination) {
    items = items.filter((item) =>
      [item.destinationName, item.destinationSlug, item.title, item.summary]
        .map(normalize)
        .some((value) => value.includes(destination)),
    );
  }
  if (theme) {
    items = items.filter((item) =>
      [...item.themes, item.summary, item.title]
        .map(normalize)
        .some((value) => value.includes(theme)),
    );
  }
  if (filters.budgetMin != null) {
    items = items.filter((item) => item.priceFrom >= Number(filters.budgetMin));
  }
  if (filters.budgetMax != null && Number(filters.budgetMax) > 0) {
    items = items.filter((item) => item.priceFrom <= Number(filters.budgetMax));
  }
  if (language) {
    items = items.filter((item) => normalize(item.language).includes(language));
  }
  if (filters.includesMeal) {
    items = items.filter(
      (item) => item.includesMeal === (filters.includesMeal === "true"),
    );
  }
  if (filters.rating != null) {
    items = items.filter((item) => item.rating >= Number(filters.rating));
  }
  if (filters.duration) {
    const duration = filters.duration;
    items = items.filter((item) => {
      if (duration === "half-day") return item.durationHours <= 5;
      if (duration === "full-day") return item.durationHours > 5;
      if (duration === "short") return item.durationHours <= 3;
      return true;
    });
  }

  if (filters.sort === "price") {
    items = [...items].sort((a, b) => a.priceFrom - b.priceFrom);
  } else if (filters.sort === "duration") {
    items = [...items].sort((a, b) => a.durationHours - b.durationHours);
  } else if (filters.sort === "rating") {
    items = [...items].sort((a, b) => b.rating - a.rating);
  }

  return items;
}

export async function getHomeData() {
  return readWithFallback(
    "getHomeData",
    async () => {
      const db = getPrisma();
      const [destinations, routes, highlights] = await Promise.all([
        db.destination.findMany({
          orderBy: [{ featured: "desc" }, { name: "asc" }],
          take: 8,
        }),
        db.routeTemplate.findMany({
          include: { destination: true },
          orderBy: { budget: "asc" },
          take: 6,
        }),
        db.experience.findMany({
          where: { isActive: true },
          include: { destination: true, place: true },
          orderBy: [{ rating: "desc" }, { reviewCount: "desc" }],
          take: 6,
        }),
      ]);

      return {
        destinations,
        routes,
        highlights: highlights.map(toExperienceCard),
      };
    },
    () => ({
      destinations: fallbackDestinations,
      routes: fallbackRouteRows(),
      highlights: fallbackExperienceRows()
        .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
        .slice(0, 6)
        .map(toExperienceCard),
    }),
  );
}

export async function getDestinations() {
  return readWithFallback(
    "getDestinations",
    () =>
      getPrisma().destination.findMany({
        orderBy: [{ featured: "desc" }, { name: "asc" }],
      }),
    () => fallbackDestinations,
  );
}

export async function searchExperiences(filters: SearchFilters) {
  return readWithFallback(
    "searchExperiences",
    async () => {
      const db = getPrisma();
      const rows = await db.experience.findMany({
        where: { isActive: true },
        include: { destination: true, place: true },
        orderBy: [{ rating: "desc" }, { priceFrom: "asc" }],
      });

      let items = rows.map(toExperienceCard);
      const destination = normalize(filters.destination);
      const theme = normalize(filters.theme);
      const language = normalize(filters.language);

      if (destination) {
        items = items.filter((item) =>
          [item.destinationName, item.destinationSlug, item.title, item.summary]
            .map(normalize)
            .some((value) => value.includes(destination)),
        );
      }
      if (theme) {
        items = items.filter((item) =>
          [...item.themes, item.summary, item.title]
            .map(normalize)
            .some((value) => value.includes(theme)),
        );
      }
      if (filters.budgetMin != null) {
        items = items.filter(
          (item) => item.priceFrom >= Number(filters.budgetMin),
        );
      }
      if (filters.budgetMax != null && Number(filters.budgetMax) > 0) {
        items = items.filter(
          (item) => item.priceFrom <= Number(filters.budgetMax),
        );
      }
      if (language) {
        items = items.filter((item) =>
          normalize(item.language).includes(language),
        );
      }
      if (filters.includesMeal) {
        items = items.filter(
          (item) => item.includesMeal === (filters.includesMeal === "true"),
        );
      }
      if (filters.rating != null) {
        items = items.filter((item) => item.rating >= Number(filters.rating));
      }
      if (filters.duration) {
        const duration = filters.duration;
        items = items.filter((item) => {
          if (duration === "half-day") return item.durationHours <= 5;
          if (duration === "full-day") return item.durationHours > 5;
          if (duration === "short") return item.durationHours <= 3;
          return true;
        });
      }

      if (filters.sort === "price") {
        items = [...items].sort((a, b) => a.priceFrom - b.priceFrom);
      } else if (filters.sort === "duration") {
        items = [...items].sort((a, b) => a.durationHours - b.durationHours);
      } else if (filters.sort === "rating") {
        items = [...items].sort((a, b) => b.rating - a.rating);
      }

      return items;
    },
    () => searchFallbackRows(filters),
  );
}

export async function getExperienceBySlug(slug: string) {
  return readWithFallback(
    "getExperienceBySlug",
    async () => {
      const db = getPrisma();
      const experience = await db.experience.findUnique({
        where: { slug },
        include: { destination: true, place: true },
      });
      if (!experience) return null;

      const [reviewLinks] = await Promise.all([
        db.reviewLink.findMany({
          where: { ownerType: "experience", ownerId: experience.id },
          orderBy: { provider: "asc" },
        }),
      ]);

      return {
        ...toExperienceCard(experience),
        description: experience.description,
        restrictions: experience.restrictions,
        includes: splitList(experience.includes),
        excludes: splitList(experience.excludes),
        reviewLinks: reviewLinks.map((link) => ({
          provider: link.provider,
          rating: link.rating,
          url: link.url,
        })),
      } satisfies ExperienceDetailData;
    },
    () => {
      const experience =
        fallbackExperienceRows().find((item) => item.slug === slug) ?? null;
      if (!experience) return null;
      return {
        ...toExperienceCard(experience),
        description: experience.description,
        restrictions: experience.restrictions,
        includes: splitList(experience.includes),
        excludes: splitList(experience.excludes),
        reviewLinks: fallbackReviewLinks
          .filter((link) => link.ownerId === experience.id)
          .map((link) => ({
            provider: link.provider,
            rating: link.rating,
            url: link.url,
          })),
      } satisfies ExperienceDetailData;
    },
  );
}

export async function getDestinationBySlug(slug: string) {
  return readWithFallback(
    "getDestinationBySlug",
    async () => {
      const db = getPrisma();
      const destination = await db.destination.findUnique({
        where: { slug },
        include: {
          places: true,
          routeTemplates: true,
          experiences: {
            where: { isActive: true },
            include: { destination: true, place: true },
            orderBy: [{ rating: "desc" }, { priceFrom: "asc" }],
          },
        },
      });

      if (!destination) return null;

      return {
        ...destination,
        experiences: destination.experiences.map(toExperienceCard),
      };
    },
    () => {
      const destination =
        fallbackDestinations.find((item) => item.slug === slug) ?? null;
      if (!destination) return null;
      return {
        ...destination,
        places: fallbackPlaces.filter(
          (place) => place.destinationId === destination.id,
        ),
        routeTemplates: fallbackRouteTemplates.filter(
          (route) => route.destinationId === destination.id,
        ),
        experiences: fallbackExperienceRows()
          .filter((experience) => experience.destinationId === destination.id)
          .map(toExperienceCard),
      };
    },
  );
}

export async function getExperienceOptions() {
  return readWithFallback(
    "getExperienceOptions",
    async () => {
      const db = getPrisma();
      const rows = await db.experience.findMany({
        where: { isActive: true },
        include: { destination: true, place: true },
        orderBy: [{ destination: { name: "asc" } }, { priceFrom: "asc" }],
      });

      return rows.map(toExperienceCard);
    },
    () => fallbackExperienceRows().map(toExperienceCard),
  );
}

export async function getItinerary(id: string) {
  return readWithFallback(
    "getItinerary",
    () =>
      getPrisma().itinerary.findUnique({
        where: { id },
        include: {
          destination: true,
          days: {
            include: {
              items: {
                include: {
                  experience: {
                    include: { destination: true, place: true },
                  },
                },
                orderBy: [{ sortOrder: "asc" }, { startTime: "asc" }],
              },
            },
            orderBy: { dayIndex: "asc" },
          },
          inquiries: { orderBy: { createdAt: "desc" } },
        },
      }),
    () => getFallbackItinerary(id),
  );
}

export async function getSharedItinerary(token: string) {
  return readWithFallback(
    "getSharedItinerary",
    () =>
      getPrisma().itinerary.findUnique({
        where: { shareToken: token },
        include: {
          destination: true,
          days: {
            include: {
              items: {
                include: {
                  experience: {
                    include: { destination: true, place: true },
                  },
                },
                orderBy: [{ sortOrder: "asc" }, { startTime: "asc" }],
              },
            },
            orderBy: { dayIndex: "asc" },
          },
        },
      }),
    () => getFallbackSharedItinerary(token),
  );
}

export async function getAdminData() {
  return readWithFallback(
    "getAdminData",
    async () => {
      const db = getPrisma();
      const [destinations, experiences, inquiries, routes, places] =
        await Promise.all([
          db.destination.findMany({ orderBy: { name: "asc" } }),
          db.experience.findMany({
            include: { destination: true },
            orderBy: { updatedAt: "desc" },
            take: 30,
          }),
          db.inquiry.findMany({
            include: { itinerary: true },
            orderBy: { createdAt: "desc" },
            take: 30,
          }),
          db.routeTemplate.findMany({
            include: { destination: true },
            orderBy: { title: "asc" },
          }),
          db.place.findMany({
            include: { destination: true },
            orderBy: { name: "asc" },
          }),
        ]);

      return { destinations, experiences, inquiries, routes, places };
    },
    () => ({
      destinations: fallbackDestinations,
      experiences: fallbackExperienceRows(),
      inquiries: getFallbackInquiries().map((inquiry) => ({
        ...inquiry,
        itinerary: inquiry.itineraryId
          ? getFallbackItinerary(inquiry.itineraryId)
          : null,
      })),
      routes: fallbackRouteRows(),
      places: fallbackPlaces.map((place) => ({
        ...place,
        destination: fallbackDestinations.find(
          (destination) => destination.id === place.destinationId,
        )!,
      })),
    }),
  );
}
