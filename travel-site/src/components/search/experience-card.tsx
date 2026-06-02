import Link from "next/link";
import { Clock, MapPin, Star, Utensils } from "lucide-react";
import { AddToItineraryButton } from "@/components/itinerary/add-to-itinerary-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { durationLabel, formatCurrency } from "@/lib/format";
import type { ExperienceCardData } from "@/lib/data";

export function ExperienceCard({
  experience,
}: {
  experience: ExperienceCardData;
}) {
  return (
    <Card className="grid overflow-hidden md:grid-cols-[240px_1fr]">
      <Link
        href={`/experiences/${experience.slug}`}
        className="block min-h-56 bg-muted md:min-h-full"
      >
        <img
          src={experience.coverImage}
          alt={experience.title}
          className="h-full w-full object-cover"
        />
      </Link>
      <div className="grid gap-4 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>{experience.destinationName}</span>
              {experience.placeName ? (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {experience.placeName}
                </span>
              ) : null}
            </div>
            <Link href={`/experiences/${experience.slug}`}>
              <h3 className="mt-1 text-xl font-semibold hover:underline">
                {experience.title}
              </h3>
            </Link>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">
              {formatCurrency(experience.priceFrom)}
              <span className="text-xs font-normal text-muted-foreground">
                起/人
              </span>
            </p>
            <p className="inline-flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />
              {experience.rating.toFixed(1)} · {experience.reviewCount} 条
            </p>
          </div>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">
          {experience.summary}
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge>
            <Clock className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
            {durationLabel(experience.durationHours)}
          </Badge>
          <Badge>{experience.difficulty}</Badge>
          <Badge>{experience.language}</Badge>
          {experience.includesMeal ? (
            <Badge>
              <Utensils className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
              含餐
            </Badge>
          ) : null}
          {experience.themes.slice(0, 3).map((theme) => (
            <Badge key={theme}>{theme}</Badge>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild variant="outline" className="sm:flex-1">
            <Link href={`/experiences/${experience.slug}`}>查看详情</Link>
          </Button>
          <AddToItineraryButton
            experienceId={experience.id}
            title={experience.title}
          />
        </div>
      </div>
    </Card>
  );
}
