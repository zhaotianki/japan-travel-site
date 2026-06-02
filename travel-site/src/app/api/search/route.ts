import { searchExperiences } from "@/lib/data";
import { searchSchema } from "@/lib/validations";

export async function GET(request: Request) {
  const params = Object.fromEntries(new URL(request.url).searchParams);
  const filters = searchSchema.parse(params);
  const experiences = await searchExperiences(filters);
  return Response.json({ experiences });
}
