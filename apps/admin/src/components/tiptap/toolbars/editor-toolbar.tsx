import type { Editor } from "@tiptap/core";

import {
  ScrollArea,
  ScrollBar,
  Separator,
  TooltipProvider,
} from "@modernstores/ui";
import { ToolbarProvider } from "./toolbar-provider";
import { BoldToolbar } from "./bold";
import { ItalicToolbar } from "./italic";
import { UnderlineToolbar } from "./underline";
import { StrikeThroughToolbar } from "./strikethrough";
import { CodeToolbar } from "./code";
import { CodeBlockToolbar } from "./code-block";
import { BlockquoteToolbar } from "./blockquote";
import { BulletListToolbar } from "./bullet-list";
import { OrderedListToolbar } from "./ordered-list";
import { HorizontalRuleToolbar } from "./horizontal-rule";
import { HardBreakToolbar } from "./hard-break";
import { UndoToolbar } from "./undo";
import { RedoToolbar } from "./redo";
import { ImagePlaceholderToolbar } from "./image-placeholder-toolbar";
import { HeadingsToolbar } from "./headings";
import { AlignmentTooolbar } from "./alignment";
import { LinkToolbar } from "./link";
import { ColorHighlightToolbar } from "./color-and-highlight";
import { SearchAndReplaceToolbar } from "./search-and-replace-toolbar";

interface EditorToolbarProps {
  editor: Editor;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  return (
    <div className="sticky top-0 z-20 hidden w-full border-b bg-background sm:block">
      <TooltipProvider>
        <ToolbarProvider editor={editor}>
          <ScrollArea className="w-full">
            <div className="flex items-center gap-0.5 p-1">
              <UndoToolbar />
              <RedoToolbar />
              <Separator orientation="vertical" className="mx-0.5 h-6" />
              <HeadingsToolbar />
              <Separator orientation="vertical" className="mx-0.5 h-6" />
              <BoldToolbar />
              <ItalicToolbar />
              <UnderlineToolbar />
              <StrikeThroughToolbar />
              <Separator orientation="vertical" className="mx-0.5 h-6" />
              <ColorHighlightToolbar />
              <Separator orientation="vertical" className="mx-0.5 h-6" />
              <CodeToolbar />
              <CodeBlockToolbar />
              <BlockquoteToolbar />
              <Separator orientation="vertical" className="mx-0.5 h-6" />
              <BulletListToolbar />
              <OrderedListToolbar />
              <Separator orientation="vertical" className="mx-0.5 h-6" />
              <AlignmentTooolbar />
              <Separator orientation="vertical" className="mx-0.5 h-6" />
              <LinkToolbar />
              <ImagePlaceholderToolbar />
              <Separator orientation="vertical" className="mx-0.5 h-6" />
              <HorizontalRuleToolbar />
              <HardBreakToolbar />
              <Separator orientation="vertical" className="mx-0.5 h-6" />
              <SearchAndReplaceToolbar />
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </ToolbarProvider>
      </TooltipProvider>
    </div>
  );
}
