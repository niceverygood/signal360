"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Container } from "@/app/components/ui/Container";
import { FaqItem } from "@/app/components/ui/FaqItem";
import { SectionHeader } from "@/app/components/ui/SectionHeader";

type Faq = {
  q: string;
  a: string;
  open?: boolean;
};

const faqs: Faq[] = [
  {
    q: "환불 받고 싶어요.",
    a: "DB 분배 전이라면 전액 환불 가능합니다. 자세한 내용은 시그널360 카카오톡 채널로 문의 부탁드립니다.",
    open: true,
  },
  { q: "DB 분배 방법이 궁금합니다.", a: "[추후 답변 예정]" },
  {
    q: "배분 조건을 보다 더 자세히 설정할 수 있나요? (나이, 특정 지역, 성별 등)",
    a: "[추후 답변 예정]",
  },
  { q: "결제 페이지가 안 넘어가요.", a: "[추후 답변 예정]" },
  {
    q: "분배 받는 중인데 분배 스케줄을 변경하고 싶어요.",
    a: "[추후 답변 예정]",
  },
  {
    q: "분배 받는 중인데 상품을 변경하고 싶어요.",
    a: "[추후 답변 예정]",
  },
  { q: "대량 구매 시 할인 혜택이 있나요?", a: "[추후 답변 예정]" },
  { q: "배분에 걸리는 기간은 어느 정도 인가요?", a: "[추후 답변 예정]" },
  {
    q: "AS 승인 여부는 어디에서 확인할 수 있나요?",
    a: "[추후 답변 예정]",
  },
  { q: "장기부재의 기준은 무엇인가요?", a: "[추후 답변 예정]" },
];

const defaultOpenValues = faqs
  .map((f, i) => (f.open ? `faq-${i}` : null))
  .filter((v): v is string => v !== null);

export function Section6() {
  return (
    <section id="faq" className="bg-white py-[100px]">
      <Container>
        <div className="flex flex-col items-center gap-[90px]">
          <SectionHeader align="center" title="자주 묻는 질문" />
          <Accordion.Root
            type="multiple"
            defaultValue={defaultOpenValues}
            className="w-full"
          >
            {faqs.map((f, i) => (
              <FaqItem
                key={i}
                value={`faq-${i}`}
                question={f.q}
                answer={f.a}
              />
            ))}
          </Accordion.Root>
        </div>
      </Container>
    </section>
  );
}
