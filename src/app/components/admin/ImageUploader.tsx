import { useState, useRef, useCallback, type DragEvent, type ChangeEvent } from "react";
import { Upload, Link, X, ImageIcon, AlertCircle, Cloud, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  uploadToCloudinary,
  resizeAndCompress,
  validateFileSize,
  getStorageUsage,
  isDataUrl,
} from "../../lib/imageUtils";
import { toast } from "sonner";

type Mode = "upload" | "url";

interface ImageUploaderProps {
  /** URL gambar saat ini (bisa Cloudinary URL, data URL, atau URL biasa). */
  value: string;
  /** Callback saat gambar berubah. */
  onChange: (url: string) => void;
  /** Label yang ditampilkan. */
  label?: string;
  /** Hint di bawah komponen. */
  hint?: string;
  /** Ratio aspek preview (default: "video" = 16:9). */
  aspectRatio?: "video" | "square";
}

export function ImageUploader({
  value,
  onChange,
  label = "Gambar",
  hint,
  aspectRatio = "video",
}: ImageUploaderProps) {
  const [mode, setMode] = useState<Mode>(
    value && !isDataUrl(value) ? "url" : "upload"
  );
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const aspectClass = aspectRatio === "square" ? "aspect-square" : "aspect-video";

  const handleFile = useCallback(
    async (file: File) => {
      // Validasi tipe
      if (!file.type.startsWith("image/")) {
        toast.error("File harus berupa gambar (JPG, PNG, WebP, dll).");
        return;
      }

      // Validasi ukuran
      const sizeError = validateFileSize(file);
      if (sizeError) {
        toast.error(sizeError);
        return;
      }

      setLoading(true);
      try {
        // 1. Coba upload langsung ke Cloudinary
        try {
          const cloudinaryUrl = await uploadToCloudinary(file);
          onChange(cloudinaryUrl);
          toast.success("Gambar berhasil di-upload ke Cloudinary (Cloud)!");
          return;
        } catch (cloudErr) {
          console.warn("Cloudinary upload failed, falling back to local compression:", cloudErr);
        }

        // 2. Fallback jika Cloudinary belum di-preset/gagal: gunakan kompresi Base64 lokal
        const dataUrl = await resizeAndCompress(file);

        // Cek storage usage
        const usage = getStorageUsage();
        if (usage.percent > 90) {
          toast.warning(
            `Penyimpanan lokal hampir penuh (${usage.usedMB}MB / 5MB).`
          );
        }

        onChange(dataUrl);
        toast.success("Gambar disimpan secara lokal.");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Gagal memproses gambar.");
      } finally {
        setLoading(false);
      }
    },
    [onChange]
  );

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      // Reset input agar bisa upload file yang sama lagi
      e.target.value = "";
    },
    [handleFile]
  );

  const clearImage = () => {
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const isCloudinaryUrl = value.includes("cloudinary.com");

  return (
    <div className="grid gap-2">
      {label && <Label>{label}</Label>}

      {/* Tab selector */}
      <div className="flex rounded-lg border border-border bg-muted/50 p-0.5">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            mode === "upload"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Upload className="size-3.5" /> Upload File
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            mode === "url"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Link className="size-3.5" /> URL Link
        </button>
      </div>

      {/* Upload mode */}
      {mode === "upload" && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-colors ${
            dragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          } ${loading ? "pointer-events-none opacity-60" : ""}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />
          {loading ? (
            <>
              <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="mt-2 text-xs text-muted-foreground">Mengunggah gambar ke Cloud...</p>
            </>
          ) : (
            <>
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <ImageIcon className="size-5 text-primary" />
              </div>
              <p className="mt-2 text-sm font-medium text-foreground">
                {dragging ? "Lepaskan gambar di sini" : "Klik atau seret gambar ke sini"}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                JPG, PNG, WebP — Maks 5MB (Tersimpan di Cloud)
              </p>
            </>
          )}
        </div>
      )}

      {/* URL mode */}
      {mode === "url" && (
        <div className="flex gap-2">
          <Input
            placeholder="https://example.com/gambar.jpg"
            value={isDataUrl(value) ? "" : value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1"
          />
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="relative overflow-hidden rounded-xl border border-border">
          <ImageWithFallback
            src={value}
            alt="Pratinjau"
            className={`${aspectClass} w-full object-cover`}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              clearImage();
            }}
            className="absolute right-2 top-2 size-7 rounded-full shadow-md"
            aria-label="Hapus gambar"
          >
            <X className="size-3.5" />
          </Button>
          {isCloudinaryUrl ? (
            <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-emerald-600/90 px-2 py-0.5 text-[10px] font-medium text-white shadow-sm">
              <Cloud className="size-3" /> Cloudinary Hosted
            </span>
          ) : isDataUrl(value) ? (
            <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white">
              <Upload className="size-2.5" /> Local Base64
            </span>
          ) : null}
        </div>
      )}

      {/* Storage warning for local base64 */}
      {isDataUrl(value) && (() => {
        const usage = getStorageUsage();
        if (usage.percent > 70) {
          return (
            <div className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-xs text-amber-700">
              <AlertCircle className="size-3.5 shrink-0" />
              Penyimpanan lokal: {usage.usedMB}MB / 5MB ({usage.percent}%)
            </div>
          );
        }
        return null;
      })()}

      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
