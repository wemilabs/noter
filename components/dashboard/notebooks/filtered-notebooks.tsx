"use client";

import { useQueryState } from "nuqs";
import { Notebook } from "@/db/schema";
import NotebookCard from "./notebook-card";

export function FilteredNotebooks({ data }: { data: Notebook[] | undefined }) {
  const [search] = useQueryState("search", { defaultValue: "" });
  const filteredNotebooks = data?.filter((notebook) =>
    notebook.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!filteredNotebooks?.length)
    return (
      <div className="col-span-full flex items-center justify-center min-h-[200px] border-2 border-dashed border-muted rounded-lg">
        <div className="text-muted-foreground text-center">
          <p className="text-base">No notebooks found</p>
        </div>
      </div>
    );

  return (
    <>
      {filteredNotebooks?.map((notebook) => (
        <NotebookCard key={notebook.id} notebook={notebook} />
      ))}
    </>
  );
}
