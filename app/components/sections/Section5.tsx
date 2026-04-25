import { Container } from "@/app/components/ui/Container";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { ServiceCard } from "@/app/components/ui/ServiceCard";

type Product = {
  id: string;
  name: string;
  price: number;
  category: "analysis" | "replan";
  tier: "general" | "silver";
  imageLabel: string;
};

const products: Product[] = [
  {
    id: "analysis-general",
    name: "보장 분석 리모델링 (일반)",
    price: 90000,
    category: "analysis",
    tier: "general",
    imageLabel: "분석 일반",
  },
  {
    id: "analysis-silver",
    name: "보장 분석 리모델링 (실버)",
    price: 80000,
    category: "analysis",
    tier: "silver",
    imageLabel: "분석 실버",
  },
  {
    id: "replan-silver",
    name: "보험료 플랜 재설계 (실버)",
    price: 70000,
    category: "replan",
    tier: "silver",
    imageLabel: "재설계 실버",
  },
  {
    id: "replan-general",
    name: "보험료 플랜 재설계 (일반)",
    price: 80000,
    category: "replan",
    tier: "general",
    imageLabel: "재설계 일반",
  },
];

export function Section5() {
  return (
    <section id="service" className="bg-white py-[150px]">
      <Container>
        <div className="flex flex-col gap-[90px]">
          <SectionHeader
            align="left"
            eyebrow="SERVICE"
            title={
              <>
                Signal360이{" "}
                <span className="text-primary">하면 다릅니다.</span>
              </>
            }
            subtitle="가장 선명한 성공 주파수, Signal360과 연결하세요"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <ServiceCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
