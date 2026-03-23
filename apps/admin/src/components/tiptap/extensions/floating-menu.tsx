"use client";

import { type Editor } from "@tiptap/react";
import { FloatingMenu } from "@tiptap/react/menus";
import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  ImageIcon,
  TextIcon,
  SquareCode,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  ScrollArea,
  cn,
} from "@modernstores/ui";
import { useDebounce } from "@/hooks/use-debounce";

interface CommandItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  command: (editor: Editor) => void;
  keywords?: string[];
}

const COMMANDS: CommandItem[] = [
  {
    title: "Text",
    description: "Start writing with plain text",
    icon: <TextIcon className="size-4" />,
    keywords: ["paragraph", "text", "plain"],
    command: (editor) => {
      editor.chain().focus().setParagraph().run();
    },
  },
  {
    title: "Heading 1",
    description: "Large section heading",
    icon: <Heading1 className="size-4" />,
    keywords: ["h1", "heading", "title", "large"],
    command: (editor) => {
      editor.chain().focus().toggleHeading({ level: 1 }).run();
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading",
    icon: <Heading2 className="size-4" />,
    keywords: ["h2", "heading", "subtitle", "medium"],
    command: (editor) => {
      editor.chain().focus().toggleHeading({ level: 2 }).run();
    },
  },
  {
    title: "Heading 3",
    description: "Small section heading",
    icon: <Heading3 className="size-4" />,
    keywords: ["h3", "heading", "small"],
    command: (editor) => {
      editor.chain().focus().toggleHeading({ level: 3 }).run();
    },
  },
  {
    title: "Bullet List",
    description: "Create a simple bullet list",
    icon: <List className="size-4" />,
    keywords: ["ul", "bullet", "list", "unordered"],
    command: (editor) => {
      editor.chain().focus().toggleBulletList().run();
    },
  },
  {
    title: "Ordered List",
    description: "Create a numbered list",
    icon: <ListOrdered className="size-4" />,
    keywords: ["ol", "ordered", "list", "numbered"],
    command: (editor) => {
      editor.chain().focus().toggleOrderedList().run();
    },
  },
  {
    title: "Blockquote",
    description: "Capture a quote",
    icon: <Quote className="size-4" />,
    keywords: ["quote", "blockquote", "citation"],
    command: (editor) => {
      editor.chain().focus().toggleBlockquote().run();
    },
  },
  {
    title: "Code",
    description: "Write inline code",
    icon: <Code className="size-4" />,
    keywords: ["code", "inline", "monospace"],
    command: (editor) => {
      editor.chain().focus().toggleCode().run();
    },
  },
  {
    title: "Code Block",
    description: "Add a block of code",
    icon: <SquareCode className="size-4" />,
    keywords: ["codeblock", "fenced", "code", "block"],
    command: (editor) => {
      editor.chain().focus().toggleCodeBlock().run();
    },
  },
  {
    title: "Divider",
    description: "Visually divide blocks",
    icon: <Minus className="size-4" />,
    keywords: ["divider", "rule", "hr", "horizontal", "line"],
    command: (editor) => {
      editor.chain().focus().setHorizontalRule().run();
    },
  },
  {
    title: "Image",
    description: "Insert an image",
    icon: <ImageIcon className="size-4" />,
    keywords: ["image", "photo", "picture", "media"],
    command: (editor) => {
      editor.chain().focus().insertImagePlaceholder().run();
    },
  },
];

interface TipTapFloatingMenuProps {
  editor: Editor;
}

export function TipTapFloatingMenu({ editor }: TipTapFloatingMenuProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 100);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredCommands = debouncedQuery
    ? COMMANDS.filter((cmd) => {
        const q = debouncedQuery.toLowerCase();
        return (
          cmd.title.toLowerCase().includes(q) ||
          cmd.description.toLowerCase().includes(q) ||
          cmd.keywords?.some((k) => k.toLowerCase().includes(q))
        );
      })
    : COMMANDS;

  const runCommand = useCallback(
    (commandItem: CommandItem) => {
      commandItem.command(editor);
      setOpen(false);
      setQuery("");
    },
    [editor]
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [debouncedQuery]);

  return (
    <FloatingMenu
      editor={editor}
      shouldShow={({ state }: { state: { selection: { $from: { nodeBefore: { textContent: string } | null } } }; [key: string]: unknown }) => {
        const { $from } = state.selection;
        const currentLineText = $from.nodeBefore?.textContent ?? "";
        const show = currentLineText === "/";
        if (show) {
          setOpen(true);
        }
        return show;
      }}
    >
      {open && (
        <div
          ref={containerRef}
          className="z-50 w-72 rounded-md border bg-popover shadow-md outline-none"
        >
          <Command>
            <CommandList>
              <CommandEmpty>No commands found.</CommandEmpty>
              <CommandGroup>
                <ScrollArea className="h-72">
                  {filteredCommands.map((cmd, idx) => (
                    <CommandItem
                      key={cmd.title}
                      onSelect={() => runCommand(cmd)}
                      className={cn(
                        "flex items-start gap-3 px-3 py-2",
                        idx === selectedIndex && "bg-accent"
                      )}
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-background">
                        {cmd.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{cmd.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {cmd.description}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </FloatingMenu>
  );
}
