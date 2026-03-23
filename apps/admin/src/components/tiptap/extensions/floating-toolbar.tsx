"use client";

import { type Editor } from "@tiptap/react";
import { BubbleMenu, type BubbleMenuProps } from "@tiptap/react/menus";
import { Bold, Italic, Underline as UnderlineIcon } from "lucide-react";

import {
  ScrollArea,
  ScrollBar,
  Separator,
  TooltipProvider,
} from "@modernstores/ui";
import { useMediaQuery } from "@/hooks/use-media-querry";
import { BoldToolbar } from "../toolbars/bold";
import { ItalicToolbar } from "../toolbars/italic";
import { UnderlineToolbar } from "../toolbars/underline";
import { StrikeThroughToolbar } from "../toolbars/strikethrough";
import { CodeToolbar } from "../toolbars/code";
import { LinkToolbar } from "../toolbars/link";
import { ColorHighlightToolbar } from "../toolbars/color-and-highlight";
import { AlignmentTooolbar } from "../toolbars/alignment";
import { HeadingsToolbar } from "../toolbars/headings";
import { ToolbarProvider } from "../toolbars/toolbar-provider";

interface FloatingToolbarProps {
  editor: Editor;
}

export function FloatingToolbar({ editor }: FloatingToolbarProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");

  if (!isMobile) return null;

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor: ed, from, to }: { editor: Editor; from: number; to: number; [key: string]: unknown }) => {
        if (!isMobile) return false;
        const isEditorFocused = ed.isFocused;
        return isEditorFocused && from === to;
      }}
    >
      <TooltipProvider>
        <ToolbarProvider editor={editor}>
          <div className="flex items-center rounded-md border bg-background shadow-md">
            <ScrollArea className="max-w-[350px]">
              <div className="flex items-center gap-0.5 p-1">
                <HeadingsToolbar />
                <Separator orientation="vertical" className="mx-0.5 h-6" />
                <BoldToolbar />
                <ItalicToolbar />
                <UnderlineToolbar />
                <StrikeThroughToolbar />
                <Separator orientation="vertical" className="mx-0.5 h-6" />
                <CodeToolbar />
                <LinkToolbar />
                <Separator orientation="vertical" className="mx-0.5 h-6" />
                <ColorHighlightToolbar />
                <Separator orientation="vertical" className="mx-0.5 h-6" />
                <AlignmentTooolbar />
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </ToolbarProvider>
      </TooltipProvider>
    </BubbleMenu>
  );
}
