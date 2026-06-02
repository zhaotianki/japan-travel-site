import Link from "next/link";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { SearchFilters } from "@/lib/validations";

export function SearchFilters({ filters }: { filters: SearchFilters }) {
  return (
    <form className="grid gap-3" action="/search" autoComplete="off">
      <input type="hidden" name="destination" value={filters.destination ?? ""} />
      <input type="hidden" name="date" value={filters.date ?? ""} />
      <input
        type="hidden"
        name="partySize"
        value={filters.partySize?.toString() ?? "2"}
      />
      <div className="flex items-center justify-between">
        <h2 className="inline-flex items-center gap-2 text-base font-semibold">
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          筛选
        </h2>
        <Link
          href="/search"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" aria-hidden="true" />
          清除
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
        <label className="grid gap-1 text-sm">
          <span>最低预算</span>
          <Input
            type="number"
            name="budgetMin"
            min="0"
            defaultValue={filters.budgetMin?.toString() ?? ""}
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span>最高预算</span>
          <Input
            type="number"
            name="budgetMax"
            min="0"
            defaultValue={filters.budgetMax?.toString() ?? ""}
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span>时长</span>
          <Select name="duration" defaultValue={filters.duration ?? ""}>
            <option value="">不限</option>
            <option value="short">3 小时内</option>
            <option value="half-day">半日</option>
            <option value="full-day">一日</option>
          </Select>
        </label>
        <label className="grid gap-1 text-sm">
          <span>语言</span>
          <Select name="language" defaultValue={filters.language ?? ""}>
            <option value="">不限</option>
            <option value="中文">中文</option>
            <option value="英文">英文</option>
          </Select>
        </label>
        <label className="grid gap-1 text-sm">
          <span>是否含餐</span>
          <Select name="includesMeal" defaultValue={filters.includesMeal ?? ""}>
            <option value="">不限</option>
            <option value="true">含餐</option>
            <option value="false">不含餐</option>
          </Select>
        </label>
        <label className="grid gap-1 text-sm">
          <span>最低评分</span>
          <Select name="rating" defaultValue={filters.rating?.toString() ?? ""}>
            <option value="">不限</option>
            <option value="4.5">4.5+</option>
            <option value="4.7">4.7+</option>
            <option value="4.8">4.8+</option>
          </Select>
        </label>
        <label className="grid gap-1 text-sm">
          <span>排序</span>
          <Select name="sort" defaultValue={filters.sort ?? "recommended"}>
            <option value="recommended">推荐</option>
            <option value="price">价格从低到高</option>
            <option value="rating">评分从高到低</option>
            <option value="duration">时长从短到长</option>
          </Select>
        </label>
      </div>
      <Button type="submit" className="w-full">
        应用筛选
      </Button>
    </form>
  );
}
