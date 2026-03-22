"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, X, Star, ImageIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@modernstores/ui";

export interface UploadedImage {
  id: string;
  file?: File;
  previewUrl: string;
  altText: string;
  isPrimary: boolean;
  sortOrder: number;
}

interface ImageUploaderProps {
  images: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
}

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = useCallback(
    (files: FileList | null) => {
      if (!files?.length) return;
      const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
      const newImages: UploadedImage[] = valid.map((file, i) => ({
        id: `${Date.now()}-${i}`,
        file,
        previewUrl: URL.createObjectURL(file),
        altText: file.name.replace(/\.[^.]+$/, ""),
        isPrimary: images.length === 0 && i === 0,
        sortOrder: images.length + i,
      }));
      onChange([...images, ...newImages]);
    },
    [images, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const remove = (id: string) => {
    const updated = images
      .filter((img) => img.id !== id)
      .map((img, i) => ({ ...img, sortOrder: i }));
    // If removed primary, set first as primary
    const removedImg = images.find((img) => img.id === id);
    if (removedImg?.isPrimary && updated.length > 0) {
      const first = updated[0];
      if (first) first.isPrimary = true;
    }
    onChange(updated);
  };

  const setPrimary = (id: string) => {
    onChange(images.map((img) => ({ ...img, isPrimary: img.id === id })));
  };

  const move = (id: string, dir: -1 | 1) => {
    const idx = images.findIndex((img) => img.id === id);
    const next = idx + dir;
    if (next < 0 || next >= images.length) return;
    const arr = [...images];
    const a = arr[idx];
    const b = arr[next];
    if (!a || !b) return;
    arr[idx] = b;
    arr[next] = a;
    onChange(arr.map((img, i) => ({ ...img, sortOrder: i })));
  };

  const updateAlt = (id: string, altText: string) => {
    onChange(images.map((img) => (img.id === id ? { ...img, altText } : img)));
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 text-center transition-colors",
          dragging
            ? "border-primary bg-primary/5"
            : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50"
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background shadow-sm">
          <Upload className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            Drop images here or <span className="text-primary">browse</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            PNG, JPG, WebP up to 10MB each · Multiple files supported
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((img, idx) => (
            <div
              key={img.id}
              className={cn(
                "group relative overflow-hidden rounded-xl border bg-muted transition-shadow hover:shadow-md",
                img.isPrimary && "ring-2 ring-primary ring-offset-2"
              )}
            >
              {/* Thumbnail */}
              <div className="relative aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.previewUrl}
                  alt={img.altText}
                  className="h-full w-full object-cover"
                />
                {/* Primary badge */}
                {img.isPrimary && (
                  <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground shadow">
                    <Star className="h-2.5 w-2.5 fill-current" />
                    Primary
                  </span>
                )}
                {/* Overlay actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  {!img.isPrimary && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setPrimary(img.id); }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-foreground shadow transition-transform hover:scale-105"
                      title="Set as primary"
                    >
                      <Star className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); move(img.id, -1); }}
                    disabled={idx === 0}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-foreground shadow transition-transform hover:scale-105 disabled:opacity-30"
                    title="Move left"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); move(img.id, 1); }}
                    disabled={idx === images.length - 1}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-foreground shadow transition-transform hover:scale-105 disabled:opacity-30"
                    title="Move right"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); remove(img.id); }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500 text-white shadow transition-transform hover:scale-105"
                    title="Remove"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              {/* Alt text input */}
              <div className="border-t border-border px-2 py-1.5">
                <input
                  type="text"
                  value={img.altText}
                  onChange={(e) => updateAlt(img.id, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Alt text…"
                  className="w-full bg-transparent text-xs text-muted-foreground outline-none placeholder:text-muted-foreground/60 focus:text-foreground"
                />
              </div>
            </div>
          ))}
          {/* Add more tile */}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-muted/50 hover:text-foreground"
          >
            <ImageIcon className="h-5 w-5" />
            <span className="text-xs font-medium">Add more</span>
          </button>
        </div>
      )}

      {images.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {images.length} image{images.length !== 1 ? "s" : ""} · Click an image to set it as primary, use arrows to reorder
        </p>
      )}
    </div>
  );
}
