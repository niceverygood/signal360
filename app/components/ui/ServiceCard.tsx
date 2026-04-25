import { ImagePlaceholder } from "@/app/components/ui/ImagePlaceholder";

type ServiceCardProduct = {
  id: string;
  name: string;
  price: number;
  imageLabel: string;
};

type ServiceCardProps = {
  product: ServiceCardProduct;
  onClick?: () => void;
};

export function ServiceCard({ product, onClick }: ServiceCardProps) {
  const interactive = !!onClick;
  const interactiveProps = interactive
    ? {
        role: "button" as const,
        tabIndex: 0,
        onClick,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        },
      }
    : {};

  return (
    <div
      className="flex flex-col gap-5 cursor-pointer transition-transform duration-200 ease-out hover:-translate-y-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 rounded-card"
      {...interactiveProps}
    >
      <div className="relative w-full aspect-square">
        <ImagePlaceholder
          fill
          width={282}
          height={282}
          variant="primary"
          rounded="card"
          label={product.imageLabel}
          className="transition-shadow duration-200 group-hover:shadow-lg"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-lead text-fg">{product.name}</p>
        <p className="text-lead font-bold text-fg">
          {product.price.toLocaleString("ko-KR")}원
        </p>
      </div>
    </div>
  );
}
