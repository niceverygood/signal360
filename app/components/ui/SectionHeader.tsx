type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const alignClasses =
    align === "center"
      ? "items-center text-center"
      : "items-start text-left";

  return (
    <div className={`flex flex-col gap-4 ${alignClasses} ${className}`}>
      {eyebrow && (
        <p className="text-eyebrow text-primary uppercase">{eyebrow}</p>
      )}
      <h2 className="text-h2 text-fg">{title}</h2>
      {subtitle && <p className="text-body text-muted">{subtitle}</p>}
    </div>
  );
}
