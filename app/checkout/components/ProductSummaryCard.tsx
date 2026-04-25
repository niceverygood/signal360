import { ImagePlaceholder } from "@/app/components/ui/ImagePlaceholder";
import type { CheckoutProduct } from "@/app/checkout/CheckoutForm";

export function ProductSummaryCard({ product }: { product: CheckoutProduct }) {
  return (
    <section className="bg-white rounded-card p-6">
      <h2 className="text-h3 text-fg mb-6">주문 상품</h2>
      <div className="flex gap-6 items-center">
        <div className="relative shrink-0 w-[100px] h-[100px]">
          <ImagePlaceholder
            fill
            width={100}
            height={100}
            variant="primary"
            rounded="card"
            label={product.name}
          />
        </div>
        <div className="flex flex-col gap-2 min-w-0 flex-1">
          <p className="text-lead text-fg">{product.name}</p>
          {product.description && (
            <p className="text-body text-muted line-clamp-2">
              {product.description}
            </p>
          )}
          <p className="text-lead font-bold text-fg">
            {product.price.toLocaleString("ko-KR")}원
          </p>
        </div>
      </div>
    </section>
  );
}
