"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MoreVertical, Copy, Trash2, Share2, Users2, Link } from "lucide-react";

import { deleteNote } from "@/server/notes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ClipboardItemConstructor = new (
  items: Record<string, Blob | Promise<Blob>>,
  options?: ClipboardItemOptions
) => ClipboardItem;

export function MoreActions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false),
    [isDeletingNote, setIsDeletingNote] = useState(false);
  const router = useRouter();
  const url = window.location.href;

  const copyNoteContent = async () => {
    try {
      const editorElement = document.querySelector<HTMLElement>(".ProseMirror");
      if (!editorElement) {
        toast.error("Editor not found");
        return;
      }

      const plainText = editorElement.innerText ?? "";
      const html = editorElement.innerHTML ?? "";

      if (!plainText.trim() && !html.trim()) {
        toast.message("Nothing to copy");
        return;
      }

      // Prefer rich copy (HTML + plain text)
      const ClipboardItemConstructor: ClipboardItemConstructor | undefined =
        typeof window !== "undefined" && "ClipboardItem" in window
          ? (window.ClipboardItem as unknown as ClipboardItemConstructor)
          : undefined;
      if (navigator.clipboard?.write && ClipboardItemConstructor) {
        const item = new ClipboardItemConstructor({
          "text/plain": new Blob([plainText], { type: "text/plain" }),
          "text/html": new Blob([html], { type: "text/html" }),
        });
        await navigator.clipboard.write([item]);
        toast.success("Note content copied");
        return;
      }

      // Fallback to plain text
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(plainText);
        toast.success("Note content copied");
        return;
      }

      // Legacy textarea fallback
      const textarea = document.createElement("textarea");
      textarea.value = plainText;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      toast.success("Note content copied");
    } catch {
      toast.error("Failed to copy note content");
    }
  };

  const copyCurrentUrl = async (url: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      toast.success("Link copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const noteIdExtractedFromTheUrl = url.split("/").pop() ?? "";
  const handleDeleteNote = async (noteId: string) => {
    try {
      setIsDeletingNote((prev) => !prev);
      const response = await deleteNote(noteId);

      if (response.success) {
        toast.success("Note deleted successfully");
        router.back();
      }
    } catch {
      toast.error("Failed to delete note");
    } finally {
      setIsDeletingNote(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="More actions">
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={async (e) => {
              e.preventDefault();
              await copyNoteContent();
            }}
          >
            <Copy className="size-4" /> Copy
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            {/* TODO: Should behave like the YouTube share button */}
            <Share2 className="size-4" /> Share
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              disabled
              className="flex items-center gap-2"
            >
              <Users2 className="size-4" /> Invite others
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            onSelect={async () => {
              await copyCurrentUrl(url);
            }}
          >
            <Link className="size-4" /> Copy link
            <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <a
            href="https://github.com/wemilabs/noter"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger className="flex items-center gap-2 py-1.5 mt-1 text-left text-sm bg-red-600/10 hover:bg-red-600/20 w-full rounded-sm">
            <Trash2 className="size-4 ml-2 text-red-600" />{" "}
            <span className="text-red-600">Delete</span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. It will permanently delete this
                note.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteNote(noteIdExtractedFromTheUrl);
                }}
                disabled={isDeletingNote}
                className="bg-red-600 hover:bg-red-600/80 dark:text-white"
              >
                {isDeletingNote ? "Deleting..." : "Continue"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
