import { ImagePlaceholder } from "@/app/components/ui/ImagePlaceholder";

type FeatureRowProps = {
  title: React.ReactNode;
  bullets: string[];
  imageLabel: string;
  reverse?: boolean;
};

export function FeatureRow({
  title,
  bullets,
  imageLabel,
  reverse = false,
}: FeatureRowProps) {
  return (
    <div
      className={`flex flex-col gap-8 mx-auto max-w-[820px] md:flex-row md:items-center md:gap-12 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="flex flex-col gap-3 w-full md:max-w-[374px]">
        <h3 className="text-h3 text-fg">{title}</h3>
        <ul className="list-disc pl-7 flex flex-col gap-1 text-body text-muted">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
      <ImagePlaceholder
        width={401}
        height={401}
        variant="light"
        rounded="card"
        label={imageLabel}
      />
    </div>
  );
}
