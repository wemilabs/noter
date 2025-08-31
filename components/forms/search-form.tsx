"use client";

import { useQueryState } from "nuqs";
import { Search, X } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });

  return (
    <form {...props}>
      <div className="relative flex items-center gap-2">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          type="search"
          placeholder="Search through..."
          className="w-full pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value || null)}
        />

        {search ? (
          <button
            type="reset"
            onClick={() => setSearch("")}
            className="absolute top-1/2 right-2 -translate-y-1/2"
          >
            <X className="size-4 opacity-50" />
          </button>
        ) : null}
        <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </div>
    </form>
  );
}
