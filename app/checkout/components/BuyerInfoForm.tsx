"use client";

import type { BuyerInfo } from "@/app/checkout/CheckoutForm";

const PHONE_RE = /^010-\d{4}-\d{4}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
}

const inputClass =
  "w-full h-12 px-4 border border-card-light rounded-lg bg-white text-body text-fg placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors";
const labelClass = "text-body font-medium text-fg flex items-center gap-1";
const errorClass = "text-caption text-[#DC2626]";

export function BuyerInfoForm({
  buyer,
  onChange,
}: {
  buyer: BuyerInfo;
  onChange: (next: BuyerInfo) => void;
}) {
  const showNameError =
    buyer.name.length > 0 && buyer.name.trim().length < 2;
  const showPhoneError = buyer.phone.length > 0 && !PHONE_RE.test(buyer.phone);
  const showEmailError = buyer.email.length > 0 && !EMAIL_RE.test(buyer.email);

  return (
    <section className="bg-white rounded-card p-6">
      <h2 className="text-h3 text-fg mb-6">주문자 정보</h2>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="buyer-name" className={labelClass}>
            이름<span className="text-primary">*</span>
          </label>
          <input
            id="buyer-name"
            type="text"
            value={buyer.name}
            onChange={(e) => onChange({ ...buyer, name: e.target.value })}
            className={inputClass}
            placeholder="홍길동"
            autoComplete="name"
          />
          {showNameError && (
            <p className={errorClass}>이름을 2자 이상 입력해주세요.</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="buyer-phone" className={labelClass}>
            연락처<span className="text-primary">*</span>
          </label>
          <input
            id="buyer-phone"
            type="tel"
            inputMode="numeric"
            value={buyer.phone}
            onChange={(e) =>
              onChange({ ...buyer, phone: formatPhone(e.target.value) })
            }
            className={inputClass}
            placeholder="010-1234-5678"
            autoComplete="tel"
          />
          {showPhoneError && (
            <p className={errorClass}>
              010으로 시작하는 11자리 번호를 입력해주세요.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="buyer-email" className={labelClass}>
            이메일{" "}
            <span className="text-caption text-muted font-normal">(선택)</span>
          </label>
          <input
            id="buyer-email"
            type="email"
            value={buyer.email}
            onChange={(e) => onChange({ ...buyer, email: e.target.value })}
            className={inputClass}
            placeholder="example@email.com"
            autoComplete="email"
          />
          {showEmailError && (
            <p className={errorClass}>올바른 이메일 형식이 아닙니다.</p>
          )}
        </div>
      </div>
    </section>
  );
}
