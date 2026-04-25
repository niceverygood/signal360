import { ImageIcon } from "lucide-react";

type ImagePlaceholderProps = {
  width: number;
  height: number;
  label?: string;
  variant?: "light" | "dark" | "primary";
  rounded?: "none" | "card" | "full";
  className?: string;
  fill?: boolean;
};

const variantClasses = {
  light: {
    bg: "bg-card-light",
    border: "border-muted/30",
    color: "text-muted",
  },
  dark: {
    bg: "bg-navy",
    border: "border-fg-on-dark/20",
    color: "text-muted-on-dark",
  },
  primary: {
    bg: "bg-primary/10",
    border: "border-primary/40",
    color: "text-primary",
  },
};

const roundedClasses = {
  none: "rounded-none",
  card: "rounded-card",
  full: "rounded-full",
};

export function ImagePlaceholder({
  width,
  height,
  label,
  variant = "light",
  rounded = "card",
  className = "",
  fill = false,
}: ImagePlaceholderProps) {
  const v = variantClasses[variant];
  const r = roundedClasses[rounded];
  const positionClass = fill ? "absolute inset-0" : "relative";
  const showLabel = label && height >= 80;
  const showDim = height >= 100;
  const sizeStyle = fill ? undefined : { width, height };

  return (
    <div
      className={`${positionClass} border-2 border-dashed flex items-center justify-center overflow-hidden ${v.bg} ${v.border} ${r} ${className}`}
      style={sizeStyle}
      role="img"
      aria-label={label ? `${label} (placeholder)` : "Image placeholder"}
    >
      <div
        className={`flex flex-col items-center gap-2 px-4 text-center ${v.color}`}
      >
        <ImageIcon size={32} strokeWidth={1.5} aria-hidden="true" />
        {showLabel && <p className="text-caption">{label}</p>}
      </div>
      {showDim && (
        <p
          className={`absolute bottom-2 right-3 text-caption opacity-70 ${v.color}`}
        >
          {width}×{height}
        </p>
      )}
    </div>
  );
}
