type StatItemProps = {
  value: string;
  label: React.ReactNode;
  size?: "lg" | "sm";
};

const sizeClasses = {
  lg: { container: "gap-3.5", label: "text-lead" },
  sm: { container: "gap-1", label: "text-base font-medium" },
};

export function StatItem({ value, label, size = "lg" }: StatItemProps) {
  const s = sizeClasses[size];
  return (
    <div className={`flex flex-col items-center text-center ${s.container}`}>
      <p className="text-h2 text-fg-on-dark">{value}</p>
      <p className={`text-muted-on-dark ${s.label}`}>{label}</p>
    </div>
  );
}
