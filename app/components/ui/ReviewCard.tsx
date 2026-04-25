import { ImagePlaceholder } from "@/app/components/ui/ImagePlaceholder";

type ReviewCardProps = {
  name: string;
  company: string;
  quote: string;
  avatarLabel?: string;
};

export function ReviewCard({
  name,
  company,
  quote,
  avatarLabel = "프로필",
}: ReviewCardProps) {
  return (
    <div className="bg-card-light rounded-card p-8 h-[258px] flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <ImagePlaceholder
          width={60}
          height={60}
          variant="light"
          rounded="full"
          label={avatarLabel}
        />
        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-lead text-fg">{name}</p>
          <p className="text-body text-muted">{company}</p>
        </div>
      </div>
      <p className="text-body text-fg line-clamp-3">{quote}</p>
    </div>
  );
}
