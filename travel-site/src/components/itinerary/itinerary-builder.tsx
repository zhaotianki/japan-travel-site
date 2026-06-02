"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  CheckCircle2,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { durationLabel, formatCurrency } from "@/lib/format";
import type { ExperienceCardData } from "@/lib/data";

const STORAGE_KEY = "travel-site:selected-experiences";

type DraftItem = {
  uid: string;
  experienceId: string;
  dayIndex: number;
  startTime: string;
  endTime: string;
  notes: string;
};

function readSelectedIds() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function endTime(startTime: string, hours: number) {
  const [h, m] = startTime.split(":").map(Number);
  const total = h * 60 + m + Math.round(hours * 60);
  const endH = Math.floor(total / 60) % 24;
  const endM = total % 60;
  return `${endH.toString().padStart(2, "0")}:${endM
    .toString()
    .padStart(2, "0")}`;
}

export function ItineraryBuilder({
  experiences,
  destinations,
}: {
  experiences: ExperienceCardData[];
  destinations: { id: string; name: string; slug: string }[];
}) {
  const router = useRouter();
  const [title, setTitle] = useState("日本自由行草案");
  const [destinationId, setDestinationId] = useState(destinations[0]?.id ?? "");
  const [startDate, setStartDate] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [daysCount, setDaysCount] = useState(3);
  const [items, setItems] = useState<DraftItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const experienceMap = useMemo(
    () => new Map(experiences.map((item) => [item.id, item])),
    [experiences],
  );

  useEffect(() => {
    queueMicrotask(() => {
      const selected = readSelectedIds();
      if (!selected.length) return;
      setItems(
        selected
          .filter((id) => experienceMap.has(id))
          .map((id, index) => {
            const experience = experienceMap.get(id)!;
            const dayIndex = (index % Math.max(1, daysCount)) + 1;
            const start = index % 2 === 0 ? "09:30" : "14:30";
            return {
              uid: crypto.randomUUID(),
              experienceId: id,
              dayIndex,
              startTime: start,
              endTime: endTime(start, experience.durationHours),
              notes: "",
            };
          }),
      );
    });
  }, [daysCount, experienceMap]);

  const total = items.reduce((sum, item) => {
    const experience = experienceMap.get(item.experienceId);
    return sum + (experience?.priceFrom ?? 0) * partySize;
  }, 0);

  const conflicts = items.filter((item, index) =>
    items.some(
      (candidate, candidateIndex) =>
        candidateIndex !== index &&
        candidate.dayIndex === item.dayIndex &&
        candidate.startTime < item.endTime &&
        item.startTime < candidate.endTime,
    ),
  );

  function addExperience(id: string) {
    const experience = experienceMap.get(id);
    if (!experience) return;
    const start = "09:30";
    setItems((current) => [
      ...current,
      {
        uid: crypto.randomUUID(),
        experienceId: id,
        dayIndex: 1,
        startTime: start,
        endTime: endTime(start, experience.durationHours),
        notes: "",
      },
    ]);
  }

  function updateItem(uid: string, patch: Partial<DraftItem>) {
    setItems((current) =>
      current.map((item) => {
        if (item.uid !== uid) return item;
        const next = { ...item, ...patch };
        const experience = experienceMap.get(next.experienceId);
        if (patch.startTime && experience) {
          next.endTime = endTime(patch.startTime, experience.durationHours);
        }
        return next;
      }),
    );
  }

  function move(uid: string, direction: -1 | 1) {
    setItems((current) => {
      const index = current.findIndex((item) => item.uid === uid);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= current.length) return current;
      const next = [...current];
      const [item] = next.splice(index, 1);
      next.splice(target, 0, item);
      return next;
    });
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/itineraries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          destinationId,
          startDate,
          partySize,
          daysCount,
          items: items.map((item, index) => {
            const experience = experienceMap.get(item.experienceId);
            return {
              experienceId: item.experienceId,
              dayIndex: item.dayIndex,
              startTime: item.startTime,
              endTime: item.endTime,
              priceEstimate: experience?.priceFrom ?? 0,
              sortOrder: index,
              notes: item.notes,
            };
          }),
        }),
      });
      const payload = (await response.json()) as
        | { id: string }
        | { error: string };
      if (!response.ok || !("id" in payload)) {
        throw new Error("error" in payload ? payload.error : "保存失败");
      }
      window.localStorage.removeItem(STORAGE_KEY);
      router.push(`/itinerary/${payload.id}`);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "保存失败");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="grid gap-5">
        <Card className="grid gap-4 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-1 text-sm font-medium">
              <span>行程标题</span>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label className="grid gap-1 text-sm font-medium">
              <span>目的地</span>
              <Select
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
              >
                {destinations.map((destination) => (
                  <option key={destination.id} value={destination.id}>
                    {destination.name}
                  </option>
                ))}
              </Select>
            </label>
            <label className="grid gap-1 text-sm font-medium">
              <span>开始日期</span>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="grid gap-1 text-sm font-medium">
                <span>人数</span>
                <Input
                  type="number"
                  min="1"
                  max="20"
                  value={partySize}
                  onChange={(e) => setPartySize(Number(e.target.value))}
                />
              </label>
              <label className="grid gap-1 text-sm font-medium">
                <span>天数</span>
                <Input
                  type="number"
                  min="1"
                  max="14"
                  value={daysCount}
                  onChange={(e) => setDaysCount(Number(e.target.value))}
                />
              </label>
            </div>
          </div>
        </Card>

        {Array.from({ length: daysCount }, (_, index) => index + 1).map(
          (day) => {
            const dayItems = items.filter((item) => item.dayIndex === day);
            return (
              <section key={day} className="grid gap-3">
                <div className="flex items-center justify-between">
                  <h2 className="inline-flex items-center gap-2 text-xl font-semibold">
                    <CalendarDays className="h-5 w-5" aria-hidden="true" />
                    Day {day}
                  </h2>
                  <Badge>{dayItems.length} 项</Badge>
                </div>
                {dayItems.length ? (
                  dayItems.map((item) => {
                    const experience = experienceMap.get(item.experienceId);
                    if (!experience) return null;
                    const hasConflict = conflicts.some(
                      (conflict) => conflict.uid === item.uid,
                    );
                    return (
                      <Card key={item.uid} className="grid gap-4 p-4">
                        <div className="grid gap-4 md:grid-cols-[120px_1fr]">
                          <img
                            src={experience.coverImage}
                            alt={experience.title}
                            className="h-28 w-full rounded-md object-cover md:h-full"
                          />
                          <div className="grid gap-3">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div>
                                <p className="font-semibold">
                                  {experience.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {experience.destinationName} ·{" "}
                                  {durationLabel(experience.durationHours)} ·{" "}
                                  {formatCurrency(experience.priceFrom)} / 人
                                </p>
                              </div>
                              {hasConflict ? (
                                <Badge className="border-secondary bg-secondary/10 text-secondary">
                                  时间重叠
                                </Badge>
                              ) : null}
                            </div>
                            <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr]">
                              <label className="grid gap-1 text-sm">
                                <span>日期</span>
                                <Select
                                  value={item.dayIndex.toString()}
                                  onChange={(e) =>
                                    updateItem(item.uid, {
                                      dayIndex: Number(e.target.value),
                                    })
                                  }
                                >
                                  {Array.from(
                                    { length: daysCount },
                                    (_, dayIndex) => dayIndex + 1,
                                  ).map((dayOption) => (
                                    <option
                                      key={dayOption}
                                      value={dayOption.toString()}
                                    >
                                      Day {dayOption}
                                    </option>
                                  ))}
                                </Select>
                              </label>
                              <label className="grid gap-1 text-sm">
                                <span>开始</span>
                                <Input
                                  type="time"
                                  value={item.startTime}
                                  onChange={(e) =>
                                    updateItem(item.uid, {
                                      startTime: e.target.value,
                                    })
                                  }
                                />
                              </label>
                              <label className="grid gap-1 text-sm">
                                <span>结束</span>
                                <Input value={item.endTime} readOnly />
                              </label>
                            </div>
                            <Textarea
                              value={item.notes}
                              onChange={(e) =>
                                updateItem(item.uid, { notes: e.target.value })
                              }
                              placeholder="备注、餐厅偏好、同行人需求"
                            />
                            <div className="flex flex-wrap gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => move(item.uid, -1)}
                                aria-label="上移项目"
                              >
                                <ArrowUp className="h-4 w-4" aria-hidden="true" />
                                上移
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => move(item.uid, 1)}
                                aria-label="下移项目"
                              >
                                <ArrowDown
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                />
                                下移
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setItems((current) =>
                                    current.filter(
                                      (currentItem) =>
                                        currentItem.uid !== item.uid,
                                    ),
                                  )
                                }
                              >
                                <Trash2 className="h-4 w-4" aria-hidden="true" />
                                删除
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })
                ) : (
                  <Card className="p-5 text-sm text-muted-foreground">
                    这一天还没有安排项目。
                  </Card>
                )}
              </section>
            );
          },
        )}
      </div>

      <aside className="grid h-fit gap-4 lg:sticky lg:top-24">
        <Card className="grid gap-4 p-5">
          <div>
            <p className="text-sm text-muted-foreground">预算汇总</p>
            <p className="mt-1 text-3xl font-semibold">
              {formatCurrency(total)}
            </p>
            <p className="text-sm text-muted-foreground">
              {partySize} 人 · 人均 {formatCurrency(total / Math.max(1, partySize))}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className="rounded-md bg-muted p-3">
              <p className="font-semibold">{items.length}</p>
              <p className="text-muted-foreground">项目</p>
            </div>
            <div className="rounded-md bg-muted p-3">
              <p className="font-semibold">{daysCount}</p>
              <p className="text-muted-foreground">天数</p>
            </div>
            <div className="rounded-md bg-muted p-3">
              <p className="font-semibold">{conflicts.length}</p>
              <p className="text-muted-foreground">冲突</p>
            </div>
          </div>
          {error ? <p className="text-sm text-secondary">{error}</p> : null}
          <Button
            type="button"
            onClick={save}
            disabled={saving || items.length === 0}
            className="w-full"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            )}
            保存并生成分享链接
          </Button>
        </Card>

        <Card className="grid gap-3 p-5">
          <p className="font-semibold">可加入体验</p>
          <div className="grid max-h-[520px] gap-3 overflow-auto pr-1">
            {experiences.map((experience) => (
              <button
                key={experience.id}
                type="button"
                onClick={() => addExperience(experience.id)}
                className="grid grid-cols-[72px_1fr_auto] items-center gap-3 rounded-md border border-border bg-card p-2 text-left transition hover:bg-muted"
              >
                <img
                  src={experience.coverImage}
                  alt=""
                  className="h-16 w-16 rounded-md object-cover"
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">
                    {experience.title}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {experience.destinationName} ·{" "}
                    {formatCurrency(experience.priceFrom)}
                  </span>
                </span>
                <Plus className="h-4 w-4 text-primary" aria-hidden="true" />
              </button>
            ))}
          </div>
        </Card>
      </aside>
    </div>
  );
}
