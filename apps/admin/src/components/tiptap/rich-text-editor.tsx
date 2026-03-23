"use client";

import "./tiptap.css";
import { EditorContent, type Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { Color } from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";

import { cn } from "@modernstores/ui";
import { ImageExtension } from "./extensions/image";
import { ImagePlaceholder } from "./extensions/image-placeholder";
import SearchAndReplace from "./extensions/search-and-replace";
import { TipTapFloatingMenu } from "./extensions/floating-menu";
import { FloatingToolbar } from "./extensions/floating-toolbar";
import { EditorToolbar } from "./toolbars/editor-toolbar";
import { content } from "@/lib/content";

interface RichTextEditorDemoProps {
  className?: string;
}

export function RichTextEditorDemo({ className }: RichTextEditorDemoProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Underline,
      Subscript,
      Superscript,
      Typography,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      Placeholder.configure({
        placeholder: "Type '/' for commands…",
      }),
      ImageExtension,
      ImagePlaceholder,
      SearchAndReplace,
    ] as Extension[],
    content,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose dark:prose-invert max-w-none min-h-[500px] focus:outline-none px-6 py-4",
      },
    },
  });

  if (!editor) return null;

  return (
    <div
      className={cn(
        "relative flex w-full flex-col rounded-xl border bg-background shadow-sm",
        className
      )}
    >
      <EditorToolbar editor={editor} />
      <TipTapFloatingMenu editor={editor} />
      <FloatingToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
