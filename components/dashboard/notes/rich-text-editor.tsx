"use client";

import {
  useEditor,
  EditorContent,
  useEditorState,
  type JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import LinkExtension from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Image from "@tiptap/extension-image";
import {
  Undo,
  Redo,
  Bold,
  Italic,
  Strikethrough,
  Code,
  Underline as UnderlineIcon,
  Link,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ImagePlus,
  ChevronDown,
  Superscript as SuperscriptIcon,
  Subscript as SubscriptIcon,
} from "lucide-react";

import { updateNote } from "@/server/notes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RichTextEditorProps {
  content?: JSONContent[];
  noteId?: string;
}

const RichTextEditor = ({ content, noteId }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Subscript,
      Superscript,
      Image,
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "underline text-blue-600 dark:text-blue-400",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    immediatelyRender: false,
    autofocus: true,
    editable: true,
    injectCSS: true,
    onUpdate: ({ editor }) => {
      if (noteId) {
        const content = editor.getJSON();
        updateNote(noteId, { content });
      }
    },
    content: content ?? {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Getting started" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Welcome to the " },
            {
              type: "text",
              text: "Simple Editor",
              marks: [{ type: "italic" }],
            },
            { type: "text", text: " template! This template integrates " },
            { type: "text", text: "open source", marks: [{ type: "bold" }] },
            {
              type: "text",
              text: " UI components and Tiptap extensions licensed under ",
            },
            { type: "text", text: "MIT", marks: [{ type: "bold" }] },
            { type: "text", text: "." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Integrate it by following the " },
            {
              type: "text",
              text: "Tiptap UI Components docs",
              marks: [{ type: "code" }],
            },
            { type: "text", text: " or using our CLI tool." },
          ],
        },
        {
          type: "codeBlock",
          content: [{ type: "text", text: "npx @tiptap/cli init" }],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Features" }],
        },
        {
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "A fully responsive rich text editor with built-in support for common formatting and layout tools. Type markdown ",
                },
                { type: "text", text: "**", marks: [{ type: "bold" }] },
                { type: "text", text: " or use keyboard shortcuts " },
                { type: "text", text: "⌘+B", marks: [{ type: "code" }] },
                { type: "text", text: " for most all common markdown marks." },
              ],
            },
          ],
        },
      ],
    },
  });

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor) return {};
      return {
        isBold: ctx.editor?.isActive("bold"),
        canBold: ctx.editor?.can().chain().focus().toggleBold().run(),
        isItalic: ctx.editor?.isActive("italic"),
        canItalic: ctx.editor?.can().chain().focus().toggleItalic().run(),
        isStrike: ctx.editor?.isActive("strike"),
        canStrike: ctx.editor?.can().chain().focus().toggleStrike().run(),
        isCode: ctx.editor?.isActive("code"),
        canCode: ctx.editor?.can().chain().focus().toggleCode().run(),
        isUnderline: ctx.editor?.isActive("underline"),
        canUnderline: ctx.editor?.can().chain().focus().toggleUnderline().run(),
        isSuperscript: ctx.editor?.isActive("superscript"),
        canSuperscript: ctx.editor
          ?.can()
          .chain()
          .focus()
          .toggleSuperscript()
          .run(),
        isSubscript: ctx.editor?.isActive("subscript"),
        canSubscript: ctx.editor?.can().chain().focus().toggleSubscript().run(),
        isLink: ctx.editor?.isActive("link"),
        isParagraph: ctx.editor?.isActive("paragraph"),
        isHeading1: ctx.editor?.isActive("heading", { level: 1 }),
        isHeading2: ctx.editor?.isActive("heading", { level: 2 }),
        isHeading3: ctx.editor?.isActive("heading", { level: 3 }),
        isBulletList: ctx.editor?.isActive("bulletList"),
        isOrderedList: ctx.editor?.isActive("orderedList"),
        isCodeBlock: ctx.editor?.isActive("codeBlock"),
        isBlockquote: ctx.editor?.isActive("blockquote"),
        canUndo: ctx.editor?.can().chain().focus().undo().run(),
        canRedo: ctx.editor?.can().chain().focus().redo().run(),
        alignLeft: ctx.editor?.isActive({ textAlign: "left" }),
        alignCenter: ctx.editor?.isActive({ textAlign: "center" }),
        alignRight: ctx.editor?.isActive({ textAlign: "right" }),
        alignJustify: ctx.editor?.isActive({ textAlign: "justify" }),
      };
    },
  });

  const getActiveHeading = () => {
    if (editorState?.isHeading1) return "H1";
    if (editorState?.isHeading2) return "H2";
    if (editorState?.isHeading3) return "H3";
    return "H1";
  };

  return (
    <div className="w-full max-w-7xl bg-card text-card-foreground rounded-lg overflow-hidden border">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 bg-muted/50 border-b overflow-x-auto">
        {/* Undo/Redo */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editorState?.canUndo}
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <Undo className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editorState?.canRedo}
          className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <Redo className="size-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Heading Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-accent gap-1"
            >
              {getActiveHeading()}
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-popover border">
            <DropdownMenuItem
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Heading 1
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Heading 2
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Heading 3
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor?.chain().focus().setParagraph().run()}
              className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Paragraph
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Lists */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isBulletList
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <List className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isOrderedList
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ListOrdered className="size-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Text Formatting */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editorState?.canBold}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isBold
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Bold className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editorState?.canItalic}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isItalic
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Italic className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          disabled={!editorState?.canStrike}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isStrike
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Strikethrough className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleCode().run()}
          disabled={!editorState?.canCode}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isCode
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Code className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          disabled={!editorState?.canUnderline}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isUnderline
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <UnderlineIcon className="size-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Additional Tools */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (!editor) return;
            if (editor.isActive("link")) {
              editor.chain().focus().unsetLink().run();
              return;
            }
            const previousUrl = editor.getAttributes("link").href as
              | string
              | undefined;
            const url = window.prompt("Enter URL", previousUrl ?? "https://");
            if (!url) return;
            try {
              const parsed = new URL(url);
              editor
                .chain()
                .focus()
                .setLink({ href: parsed.toString(), target: "_blank" })
                .run();
            } catch {
              // ignore invalid URL
            }
          }}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isLink
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Link className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleSuperscript().run()}
          disabled={!editorState?.canSuperscript}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isSuperscript
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <SuperscriptIcon className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleSubscript().run()}
          disabled={!editorState?.canSubscript}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.isSubscript
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <SubscriptIcon className="size-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Alignment */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.alignLeft
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <AlignLeft className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.alignCenter
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <AlignCenter className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.alignRight
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <AlignRight className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().setTextAlign("justify").run()}
          className={`size-8 p-0 hover:bg-accent ${
            editorState?.alignJustify
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <AlignJustify className="size-4" />
        </Button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Add Button */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-accent gap-1"
          onClick={() => {
            if (!editor) return;
            const url = window.prompt("Image URL");
            if (!url) return;
            editor.chain().focus().setImage({ src: url }).run();
          }}
        >
          <ImagePlus className="size-4" />
          Add
        </Button>
      </div>

      {/* Editor Content */}
      <div className="min-h-96 p-6 bg-card">
        <EditorContent
          editor={editor}
          className="prose prose-neutral dark:prose-invert max-w-none focus:outline-none [&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:min-h-96 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3 [&_p]:mb-4 [&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto [&_code]:bg-muted [&_code]:px-1 [&_code]:rounded [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-6 [&_a]:underline [&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_a]:hover:text-blue-800 dark:[&_a]:hover:text-blue-300"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
