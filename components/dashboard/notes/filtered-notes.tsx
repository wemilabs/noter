"use client";

import { useQueryState } from "nuqs";

import { Note } from "@/db/schema";
import NoteCard from "./note-card";

export function FilteredNotes({ data }: { data: Note[] | undefined }) {
  const [search] = useQueryState("search", { defaultValue: "" });
  const q = search.trim().toLowerCase();
  const filteredNotes = q
    ? data?.filter((note) => note.title.toLowerCase().includes(q))
    : data;

  if (!filteredNotes?.length)
    return (
      <div className="col-span-full flex items-center justify-center min-h-[200px] border-2 border-dashed border-muted rounded-lg">
        <div className="text-muted-foreground text-center">
          <p className="text-base">No notes found</p>
        </div>
      </div>
    );

  return (
    <>
      {filteredNotes?.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </>
  );
}
