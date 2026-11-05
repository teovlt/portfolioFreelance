import { useRef, useState } from "react";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, ImagePlus, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApiError, uploadImage } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";

type GalleryUploadProps = {
  value: string[];
  onChange: (urls: string[]) => void;
};

// A list of images that can be uploaded several at a time, reordered and removed
export const GalleryUpload = ({ value, onChange }: GalleryUploadProps) => {
  const { token } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = async (fileList?: FileList | null) => {
    const files = Array.from(fileList ?? []).filter((file) => file.type.startsWith("image/"));
    if (!files.length) {
      if (fileList?.length) toast.error("Ces fichiers ne sont pas des images.");
      return;
    }
    setIsUploading(true);
    const uploaded: string[] = [];
    try {
      // One by one, so a failure keeps the images already sent
      for (const file of files) uploaded.push(await uploadImage(file, token));
      toast.success(files.length > 1 ? `${files.length} images téléversées.` : "Image téléversée.");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Téléversement impossible.");
    } finally {
      if (uploaded.length) onChange([...value, ...uploaded]);
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const move = (index: number, offset: number) => {
    const next = [...value];
    const [item] = next.splice(index, 1);
    next.splice(index + offset, 0, item);
    onChange(next);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 rounded-xl p-1 transition-colors",
        isDragging && "bg-primary/5 ring-2 ring-primary/40",
      )}
    >
      {value.map((url, index) => (
        <div key={`${url}-${index}`} className="group relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-muted">
          <img src={url} alt="" className="h-full w-full object-cover" draggable={false} />
          <span className="absolute left-1.5 top-1.5 rounded bg-background/85 px-1.5 text-[11px] font-semibold tabular-nums">
            {index + 2}
          </span>
          <div className="absolute inset-x-1.5 bottom-1.5 flex justify-between gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 transition-opacity">
            <div className="flex gap-1">
              <IconButton label="Déplacer avant" disabled={index === 0} onClick={() => move(index, -1)}>
                <ChevronLeft />
              </IconButton>
              <IconButton label="Déplacer après" disabled={index === value.length - 1} onClick={() => move(index, 1)}>
                <ChevronRight />
              </IconButton>
            </div>
            <IconButton label="Retirer" destructive onClick={() => onChange(value.filter((_, i) => i !== index))}>
              <X />
            </IconButton>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className="flex aspect-[16/10] flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border bg-muted/50 p-3 text-center text-xs text-muted-foreground hover:border-primary hover:text-foreground transition-colors"
      >
        {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ImagePlus className="h-5 w-5" />}
        {isUploading ? "Téléversement..." : "Ajouter des images"}
      </button>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
};

const IconButton = ({
  label,
  destructive,
  children,
  ...props
}: { label: string; destructive?: boolean; children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <Button
    type="button"
    size="icon"
    variant="secondary"
    aria-label={label}
    title={label}
    className={cn(
      "h-7 w-7 bg-background/90 shadow-sm [&_svg]:size-3.5",
      destructive && "hover:bg-destructive hover:text-destructive-foreground",
    )}
    {...props}
  >
    {children}
  </Button>
);
