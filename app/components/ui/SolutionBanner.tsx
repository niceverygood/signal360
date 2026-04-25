type SolutionBannerProps = {
  children: React.ReactNode;
};

export function SolutionBanner({ children }: SolutionBannerProps) {
  return (
    <div className="w-full bg-primary rounded-card px-6 py-7 text-center text-white text-lead font-bold">
      {children}
    </div>
  );
}
