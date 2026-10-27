import { useRef, useState } from "react";
import { toast } from "sonner";
import { ImageIcon, Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiError, uploadImage } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";

type ImageUploadProps = {
  value?: string;
  onChange: (url: string) => void;
  // Tailwind aspect/size classes for the preview box
  previewClassName?: string;
  // Clicking the preview reports where, as a CSS object-position ("x% y%")
  focalPoint?: string;
  onFocalPointChange?: (position: string) => void;
  allowClear?: boolean;
  id?: string;
};

export const ImageUpload = ({
  value,
  onChange,
  previewClassName = "aspect-[16/10]",
  focalPoint,
  onFocalPointChange,
  allowClear,
  id,
}: ImageUploadProps) => {
  const { token } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [broken, setBroken] = useState<string | null>(null);

  const handleFile = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Ce fichier n'est pas une image.");
      return;
    }
    setIsUploading(true);
    try {
      onChange(await uploadImage(file, token));
      toast.success("Image téléversée.");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Téléversement impossible.");
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handlePreviewClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onFocalPointChange || !value) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    onFocalPointChange(`${x}% ${y}%`);
  };

  const [fx, fy] = (focalPoint ?? "50% 50%").split(" ");
  const showImage = value && broken !== value;

  return (
    <div className="space-y-3">
      <div
        onClick={handlePreviewClick}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFile(e.dataTransfer.files[0]);
        }}
        className={cn(
          "group relative flex items-center justify-center overflow-hidden rounded-xl border border-dashed bg-muted/50 transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-border",
          onFocalPointChange && value && "cursor-crosshair",
          previewClassName,
        )}
      >
        {showImage ? (
          <>
            <img
              src={value}
              alt=""
              className="h-full w-full object-cover"
              style={{ objectPosition: focalPoint }}
              onError={() => setBroken(value)}
              draggable={false}
            />
            {onFocalPointChange && (
              <span
                className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.4)]"
                style={{ left: fx, top: fy }}
              />
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-full w-full flex-col items-center justify-center gap-1.5 p-4 text-center text-xs text-muted-foreground"
          >
            <ImageIcon className="h-5 w-5" />
            {value ? "Image introuvable" : "Glisser une image ici"}
          </button>
        )}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        )}
      </div>

      {onFocalPointChange && value && (
        <p className="text-xs text-muted-foreground">Clique sur l'image pour choisir le point qui reste visible au recadrage.</p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()} disabled={isUploading}>
          <Upload />
          {value ? "Remplacer" : "Téléverser"}
        </Button>
        {allowClear && value && (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
            <X />
            Retirer
          </Button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      <Input
        id={id}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/images/... ou https://..."
        className="font-mono text-xs md:text-xs"
        aria-label="Chemin de l'image"
      />
    </div>
  );
};
