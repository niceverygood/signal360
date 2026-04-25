"use client";

import { useState } from "react";
import { AgreementCheckboxes } from "@/app/checkout/components/AgreementCheckboxes";
import { BuyerInfoForm } from "@/app/checkout/components/BuyerInfoForm";
import { OrderSummaryCard } from "@/app/checkout/components/OrderSummaryCard";
import { ProductSummaryCard } from "@/app/checkout/components/ProductSummaryCard";

export type CheckoutProduct = {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string | null;
  thumbnail_url: string | null;
};

export type BuyerInfo = { name: string; phone: string; email: string };
export type Agreements = { terms: boolean; privacy: boolean; payment: boolean };

const PHONE_RE = /^010-\d{4}-\d{4}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CheckoutForm({ product }: { product: CheckoutProduct }) {
  const [buyer, setBuyer] = useState<BuyerInfo>({
    name: "",
    phone: "",
    email: "",
  });
  const [agreements, setAgreements] = useState<Agreements>({
    terms: false,
    privacy: false,
    payment: false,
  });

  const isNameValid = buyer.name.trim().length >= 2;
  const isPhoneValid = PHONE_RE.test(buyer.phone);
  const isEmailValid = !buyer.email || EMAIL_RE.test(buyer.email);
  const allAgreed =
    agreements.terms && agreements.privacy && agreements.payment;
  const isFormValid =
    isNameValid && isPhoneValid && isEmailValid && allAgreed;

  const handleSubmit = () => {
    if (!isFormValid) return;
    console.log("결제 요청:", {
      product: {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
      },
      buyer,
      agreements,
    });
    alert(
      `결제 페이지 (다음 단계: SeedPay 연동)\n\n상품: ${product.name}\n금액: ${product.price.toLocaleString(
        "ko-KR"
      )}원\n구매자: ${buyer.name} / ${buyer.phone}`
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 flex flex-col gap-8">
        <ProductSummaryCard product={product} />
        <BuyerInfoForm buyer={buyer} onChange={setBuyer} />
        <AgreementCheckboxes
          agreements={agreements}
          onChange={setAgreements}
        />
      </div>
      <div className="lg:col-span-1">
        <OrderSummaryCard
          product={product}
          isFormValid={isFormValid}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
