import { JSONContent } from "@tiptap/react";
import { Sparkles } from "lucide-react";

import { getNoteById } from "@/lib/dal";
import { formatRelativeTime } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { SetBreadcrumbs } from "@/components/dashboard/navigation/set-breadcrumbs";
import RichTextEditor from "@/components/dashboard/notes/rich-text-editor";
import { MoreActions } from "@/components/dashboard/notes/more-actions";

export default async function NotePage({
  params,
}: {
  params: Promise<{ notebookId: string; noteId: string }>;
}) {
  const { notebookId, noteId } = await params;
  const { note } = await getNoteById(noteId);

  return (
    <div className="mx-auto w-full p-4">
      <SetBreadcrumbs
        items={[
          { label: "Notebooks", href: "/dashboard/notebooks" },
          {
            label: note?.notebook?.name || "Notebook",
            href: `/dashboard/notebooks/${notebookId}`,
          },
          { label: note?.title || "Note" },
        ]}
      />

      <div className="mb-6 flex items-center justify-between">
        <div>
          {note?.updatedAt ? (
            <p className="mt-1 text-xs md:text-sm text-muted-foreground">
              Edited {formatRelativeTime(new Date(note.updatedAt))}
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" aria-label="Enhance">
            <Sparkles className="size-4" /> Enhance
          </Button>

          <MoreActions />
        </div>
      </div>

      <div className="rounded-xl shadow-sm">
        <RichTextEditor
          content={note?.content as JSONContent[]}
          noteId={noteId}
        />
      </div>
    </div>
  );
}
