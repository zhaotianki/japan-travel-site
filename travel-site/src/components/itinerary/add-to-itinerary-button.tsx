"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarPlus, Check, Route } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "travel-site:selected-experiences";

function readSelected() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function AddToItineraryButton({
  experienceId,
  title,
}: {
  experienceId: string;
  title: string;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setSelected(readSelected());
    queueMicrotask(sync);
    window.addEventListener("travel-itinerary-updated", sync);
    return () => window.removeEventListener("travel-itinerary-updated", sync);
  }, []);

  const isSelected = selected.includes(experienceId);

  function add() {
    const next = Array.from(new Set([...readSelected(), experienceId]));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSelected(next);
    window.dispatchEvent(new Event("travel-itinerary-updated"));
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Button
        type="button"
        variant={isSelected ? "quiet" : "secondary"}
        onClick={add}
        aria-label={`将${title}加入行程`}
      >
        {isSelected ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <CalendarPlus className="h-4 w-4" aria-hidden="true" />
        )}
        {isSelected ? "已加入" : "加入行程"}
      </Button>
      {selected.length > 0 ? (
        <Button asChild variant="outline">
          <Link href="/itinerary/new">
            <Route className="h-4 w-4" aria-hidden="true" />
            {selected.length} 项
          </Link>
        </Button>
      ) : null}
    </div>
  );
}
