type ProblemCardProps = {
  number: string;
  keyword: React.ReactNode;
  theme?: "light" | "dark";
};

export function ProblemCard({
  number,
  keyword,
  theme = "light",
}: ProblemCardProps) {
  const isDark = theme === "dark";
  return (
    <div
      className={`flex flex-col gap-[50px] h-[242px] w-full p-6 rounded-card items-start justify-center ${
        isDark ? "bg-navy" : "bg-card-light"
      }`}
    >
      <div className="flex flex-col gap-2.5 items-start">
        <p
          className={`text-body ${isDark ? "text-muted-on-dark" : "text-muted"}`}
        >
          {number}
        </p>
        <p className={`text-h3 ${isDark ? "text-fg-on-dark" : "text-fg"}`}>
          {keyword}
        </p>
      </div>
      <div
        className={`w-9 h-[3px] ${isDark ? "bg-primary-light" : "bg-muted"}`}
      />
    </div>
  );
}
