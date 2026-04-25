"use client";

import Link from "next/link";
import type { Agreements } from "@/app/checkout/CheckoutForm";

const items: {
  key: keyof Agreements;
  label: string;
  href: string | null;
}[] = [
  { key: "terms", label: "이용약관 동의", href: "/terms" },
  { key: "privacy", label: "개인정보 처리방침 동의", href: "/privacy" },
  { key: "payment", label: "결제대행 서비스 약관 동의", href: null },
];

const checkboxClass = "w-5 h-5 accent-primary cursor-pointer shrink-0";

export function AgreementCheckboxes({
  agreements,
  onChange,
}: {
  agreements: Agreements;
  onChange: (next: Agreements) => void;
}) {
  const allChecked =
    agreements.terms && agreements.privacy && agreements.payment;

  const toggleAll = () => {
    const next = !allChecked;
    onChange({ terms: next, privacy: next, payment: next });
  };

  const toggleOne = (key: keyof Agreements) => {
    onChange({ ...agreements, [key]: !agreements[key] });
  };

  return (
    <section className="bg-white rounded-card p-6">
      <h2 className="text-h3 text-fg mb-6">약관 동의</h2>
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={toggleAll}
            className={checkboxClass}
          />
          <span className="text-body font-medium text-fg">전체 동의</span>
        </label>

        <hr className="border-card-light" />

        {items.map((item) => (
          <label
            key={item.key}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={agreements[item.key]}
              onChange={() => toggleOne(item.key)}
              className={checkboxClass}
            />
            <span className="text-body text-fg flex-1">
              <span className="text-primary">[필수]</span> {item.label}
            </span>
            {item.href && (
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption text-muted hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                보기
              </Link>
            )}
          </label>
        ))}
      </div>
    </section>
  );
}
