import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Container } from "@/app/components/ui/Container";
import { CheckoutForm } from "@/app/checkout/CheckoutForm";
import { createClient } from "@/utils/supabase/server";

export const metadata = {
  title: "주문/결제 - 시그널360",
};

type CheckoutPageProps = {
  searchParams: Promise<{ product?: string }>;
};

export default async function CheckoutPage({
  searchParams,
}: CheckoutPageProps) {
  const { product: slug } = await searchParams;

  if (!slug) {
    redirect("/#service");
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: product } = await supabase
    .from("products")
    .select("id, slug, name, price, description, thumbnail_url")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (!product) {
    redirect("/#service");
  }

  return (
    <main className="flex-1 bg-surface py-16">
      <Container>
        <div className="flex flex-col gap-12">
          <h1 className="text-h2 text-fg">주문/결제</h1>
          <CheckoutForm product={product} />
        </div>
      </Container>
    </main>
  );
}
