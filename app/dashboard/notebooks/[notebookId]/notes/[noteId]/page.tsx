import { JSONContent } from "@tiptap/react";
import Link from "next/link";
import { ArrowLeft, MoreVertical, Share2 } from "lucide-react";

import { getNoteById } from "@/lib/dal";
import RichTextEditor from "@/components/dashboard/notes/rich-text-editor";
import { Button } from "@/components/ui/button";
import { SetBreadcrumbs } from "@/components/dashboard/navigation/set-breadcrumbs";

// Small helper to format relative time like "3 hours ago"
function formatRelativeTime(date: Date) {
  const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000); // negative for past
  const absSeconds = Math.abs(diffSeconds);
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

  if (absSeconds < 60) return rtf.format(diffSeconds, "second");
  const minutes = Math.round(diffSeconds / 60);
  if (Math.abs(minutes) < 60) return rtf.format(minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return rtf.format(hours, "hour");
  const days = Math.round(hours / 24);
  if (Math.abs(days) < 7) return rtf.format(days, "day");
  const weeks = Math.round(days / 7);
  if (Math.abs(weeks) < 4) return rtf.format(weeks, "week");
  const months = Math.round(days / 30);
  if (Math.abs(months) < 12) return rtf.format(months, "month");
  const years = Math.round(days / 365);
  return rtf.format(years, "year");
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ notebookId: string; noteId: string }>;
}) {
  const { notebookId, noteId } = await params;
  const { note } = await getNoteById(noteId);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:py-8">
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
      {/* Sticky actions + breadcrumbs */}
      <div className="sticky top-0 z-20 -mx-4 mb-4 border bg-background/80 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:-mx-6 md:px-6">
        <div className="flex items-center justify-between gap-3">
          {/* Breadcrumbs are rendered in layout via DashboardBreadcrumbs */}

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/notebooks/${notebookId}`}>
                <ArrowLeft className="size-4" /> Back
              </Link>
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="size-4" /> Share
            </Button>
            <Button variant="ghost" size="icon" aria-label="More actions">
              <MoreVertical className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-xl border bg-gradient-to-br from-muted/50 to-background p-6 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">
          {note?.title || "Untitled note"}
        </h1>
        {note?.updatedAt ? (
          <p className="mt-1 text-sm text-muted-foreground">
            Last edited {formatRelativeTime(new Date(note.updatedAt))}
          </p>
        ) : null}
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        <div className="p-4 md:p-6">
          <RichTextEditor
            content={note?.content as JSONContent[]}
            noteId={noteId}
          />
        </div>
      </div>
    </div>
  );
}
