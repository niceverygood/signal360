import { ChevronRight } from "lucide-react";

type PillButtonProps = {
  children: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  external?: boolean;
};

const baseClasses =
  "inline-flex items-center justify-center gap-3 min-w-[284px] px-6 py-5 rounded-pill bg-primary text-white text-lead font-bold transition-colors duration-150 ease-out hover:bg-[#4338CA] active:bg-[#3730A3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2";

export function PillButton({
  children,
  href,
  icon = <ChevronRight size={20} strokeWidth={2} aria-hidden="true" />,
  iconPosition = "right",
  external = false,
}: PillButtonProps) {
  const content = (
    <>
      {iconPosition === "left" && icon}
      <span>{children}</span>
      {iconPosition === "right" && icon}
    </>
  );

  if (href) {
    const externalProps = external
      ? { target: "_blank" as const, rel: "noopener noreferrer" }
      : {};
    return (
      <a href={href} className={baseClasses} {...externalProps}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={baseClasses}>
      {content}
    </button>
  );
}
