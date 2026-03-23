"use client";
/* eslint-disable */
// @ts-nocheck
import {
  CommandProps,
  Node,
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  mergeAttributes,
} from "@tiptap/react";
import { Image, Link, Upload, Loader2, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import {
  Button,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  cn,
} from "@modernstores/ui";
import {
  NODE_HANDLES_SELECTED_STYLE_CLASSNAME,
  isValidUrl,
} from "@/lib/tiptap-utils";
import { useImageUpload } from "@/hooks/use-image-upload";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imagePlaceholder: {
      insertImagePlaceholder: () => ReturnType;
    };
  }
}

export const ImagePlaceholder = Node.create({
  name: "imagePlaceholder",
  group: "block",
  atom: true,
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      width: {
        default: "100%",
      },
    };
  },

  parseHTML() {
    return [{ tag: "image-placeholder" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["image-placeholder", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImagePlaceholderNodeView);
  },

  addCommands() {
    return {
      insertImagePlaceholder:
        () =>
        ({ commands }: CommandProps) => {
          return commands.insertContent({
            type: this.name,
          });
        },
    };
  },
});

type ImagePlaceholderNodeViewProps = NodeViewProps;

function ImagePlaceholderNodeView({
  deleteNode,
  editor,
  selected,
  node,
  updateAttributes,
}: ImagePlaceholderNodeViewProps) {
  const [tab, setTab] = useState<"upload" | "url">("upload");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [errorUrl, setErrorUrl] = useState(false);

  const {
    previewUrl,
    fileInputRef: uploadRef,
    handleFileChange,
    handleRemove,
    uploading,
    error,
  } = useImageUpload({
    onUpload: (imageUrl) => {
      if (imageUrl) {
        editor
          .chain()
          .focus()
          .insertContent({
            type: "image",
            attrs: {
              src: imageUrl,
              alt: uploadRef.current?.files?.[0]?.name,
            },
          })
          .run();
        deleteNode();
      }
    },
  });

  const addImageFromUrl = useCallback(() => {
    if (!imageUrl || !isValidUrl(imageUrl)) {
      setErrorUrl(true);
      return;
    }

    editor
      .chain()
      .focus()
      .insertContent({
        type: "image",
        attrs: {
          src: imageUrl,
          alt: imageAlt,
        },
      })
      .run();
    deleteNode();
  }, [imageUrl, imageAlt, editor, deleteNode]);

  return (
    <NodeViewWrapper
      className={cn(
        "relative flex w-full cursor-default flex-col gap-2 rounded-md p-2",
        selected ? NODE_HANDLES_SELECTED_STYLE_CLASSNAME : ""
      )}
    >
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as "upload" | "url")}
        className="relative"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload" className="gap-2">
            <Upload className="size-4" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="url" className="gap-2">
            <Link className="size-4" />
            URL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-4">
          <div className="flex flex-col items-center gap-4">
            {previewUrl ? (
              <div className="relative w-full">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-48 w-full rounded-md object-contain"
                />
                {!uploading && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 size-6"
                    onClick={handleRemove}
                  >
                    <X className="size-3" />
                  </Button>
                )}
              </div>
            ) : (
              <>
                <input
                  ref={uploadRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-placeholder-upload"
                />
                <label
                  htmlFor="image-placeholder-upload"
                  className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-8 text-sm text-muted-foreground hover:bg-accent"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="size-8 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Image className="size-8" />
                      <span>Click to upload or drag & drop</span>
                      <span className="text-xs">
                        SVG, PNG, JPG or GIF (max. 800x400px)
                      </span>
                    </>
                  )}
                </label>
              </>
            )}
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="url" className="mt-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Input
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  if (errorUrl) setErrorUrl(false);
                }}
                placeholder="https://example.com/image.png"
                className={cn(errorUrl && "border-destructive")}
              />
              {errorUrl && (
                <p className="text-xs text-destructive">
                  Please enter a valid URL
                </p>
              )}
            </div>
            <Input
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
              placeholder="Alt text (optional)"
            />
            <Button onClick={addImageFromUrl} disabled={!imageUrl}>
              Add Image
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 size-6 text-muted-foreground hover:text-foreground"
        onClick={deleteNode}
      >
        <X className="size-3" />
      </Button>
    </NodeViewWrapper>
  );
}
