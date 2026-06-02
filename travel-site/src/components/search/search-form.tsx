import { Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function SearchForm({
  compact = false,
  defaults,
}: {
  compact?: boolean;
  defaults?: Record<string, string | undefined>;
}) {
  return (
    <form
      action="/search"
      autoComplete="off"
      className={
        compact
          ? "grid gap-3 rounded-md border border-border bg-card p-4 shadow-sm md:grid-cols-[1.3fr_1fr_0.7fr_0.8fr_auto]"
          : "grid gap-3 rounded-md bg-card/95 p-3 shadow-xl backdrop-blur md:grid-cols-[1.3fr_1fr_0.7fr_0.8fr_auto]"
      }
    >
      <label className="grid gap-1 text-sm font-medium">
        <span>目的地</span>
        <Input
          name="destination"
          placeholder="东京、京都、大阪..."
          defaultValue={defaults?.destination ?? ""}
        />
      </label>
      <label className="grid gap-1 text-sm font-medium">
        <span>出行日期</span>
        <Input name="date" type="date" defaultValue={defaults?.date ?? ""} />
      </label>
      <label className="grid gap-1 text-sm font-medium">
        <span className="inline-flex items-center gap-1">
          <Users className="h-4 w-4" aria-hidden="true" />
          人数
        </span>
        <Input
          name="partySize"
          type="number"
          min="1"
          max="20"
          defaultValue={defaults?.partySize ?? "2"}
        />
      </label>
      <label className="grid gap-1 text-sm font-medium">
        <span>主题</span>
        <Select name="theme" defaultValue={defaults?.theme ?? ""}>
          <option value="">不限</option>
          <option value="美食">美食</option>
          <option value="文化">文化</option>
          <option value="自然">自然</option>
          <option value="亲子">亲子</option>
          <option value="温泉">温泉</option>
          <option value="摄影">摄影</option>
        </Select>
      </label>
      <div className="flex items-end">
        <Button type="submit" size="lg" className="w-full">
          <Search className="h-4 w-4" aria-hidden="true" />
          搜索
        </Button>
      </div>
    </form>
  );
}
