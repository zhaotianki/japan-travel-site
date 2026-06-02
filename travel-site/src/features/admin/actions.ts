"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminCookie,
  isAdmin,
  setAdminCookie,
  verifyAdminPassword,
} from "@/lib/auth";
import { getPrisma } from "@/lib/db";
import {
  destinationAdminSchema,
  experienceAdminSchema,
} from "@/lib/validations";

async function requireAdmin() {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }
}

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!verifyAdminPassword(password)) {
    redirect("/admin?error=1");
  }
  await setAdminCookie();
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminCookie();
  redirect("/admin");
}

export async function createDestinationAction(formData: FormData) {
  await requireAdmin();
  const data = destinationAdminSchema.parse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    region: formData.get("region"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    season: formData.get("season"),
    budgetMin: formData.get("budgetMin"),
    budgetMax: formData.get("budgetMax"),
    coverImage: formData.get("coverImage"),
    featured: formData.get("featured") === "on",
  });

  await getPrisma().destination.create({ data });
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function createExperienceAction(formData: FormData) {
  await requireAdmin();
  const data = experienceAdminSchema.parse({
    destinationId: formData.get("destinationId"),
    title: formData.get("title"),
    slug: formData.get("slug"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    priceFrom: formData.get("priceFrom"),
    durationHours: formData.get("durationHours"),
    difficulty: formData.get("difficulty"),
    language: formData.get("language"),
    includesMeal: formData.get("includesMeal") === "on",
    cancellationPolicy: formData.get("cancellationPolicy"),
    rating: formData.get("rating"),
    reviewCount: formData.get("reviewCount"),
    audience: formData.get("audience"),
    themes: formData.get("themes"),
    startTime: formData.get("startTime"),
    meetingPoint: formData.get("meetingPoint"),
    restrictions: formData.get("restrictions"),
    includes: formData.get("includes"),
    excludes: formData.get("excludes"),
    coverImage: formData.get("coverImage"),
  });

  const experience = await getPrisma().experience.create({ data });
  await getPrisma().reviewLink.create({
    data: {
      ownerType: "experience",
      ownerId: experience.id,
      provider: "Google Maps",
      rating: data.rating,
      url: `https://www.google.com/search?q=${encodeURIComponent(
        `${experience.title} 日本 评价`,
      )}`,
    },
  });
  revalidatePath("/admin");
  revalidatePath("/search");
}

export async function toggleExperienceAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const isActive = String(formData.get("isActive") ?? "") === "true";
  await getPrisma().experience.update({
    where: { id },
    data: { isActive: !isActive },
  });
  revalidatePath("/admin");
  revalidatePath("/search");
}

export async function updateInquiryStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "new");
  await getPrisma().inquiry.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin");
}
