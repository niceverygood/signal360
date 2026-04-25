"use client";

import { useState, useEffect } from "react";
import { User, ShoppingCart, Menu, X } from "lucide-react";

const navItems = [
  { label: "홈", href: "#top" },
  { label: "상품 구매", href: "#service" },
  { label: "상담 문의", href: "#contact" },
  { label: "고객 지원", href: "#faq" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 h-[90px] bg-navy">
        <div className="mx-auto max-w-content h-full px-6 flex items-center justify-between">
          <a
            href="#top"
            className="text-h3 text-fg-on-dark tracking-tight"
            aria-label="시그널360 홈"
          >
            SIGNAL360
          </a>

          <nav className="hidden md:flex items-center gap-10 lg:gap-[60px]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base lg:text-lg font-medium text-fg-on-dark hover:text-primary-light transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#"
              aria-label="계정"
              className="text-fg-on-dark hover:text-primary-light transition-colors"
            >
              <User size={24} strokeWidth={2} aria-hidden="true" />
            </a>
            <a
              href="#"
              aria-label="장바구니"
              className="text-fg-on-dark hover:text-primary-light transition-colors"
            >
              <ShoppingCart size={24} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>

          <button
            type="button"
            className="md:hidden text-fg-on-dark"
            aria-label="메뉴 열기"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={28} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-navy md:hidden flex flex-col">
          <div className="h-[90px] px-6 flex items-center justify-between border-b border-white/10">
            <span className="text-h3 text-fg-on-dark tracking-tight">
              SIGNAL360
            </span>
            <button
              type="button"
              className="text-fg-on-dark"
              aria-label="메뉴 닫기"
              onClick={() => setMobileOpen(false)}
            >
              <X size={28} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
          <nav className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-medium text-fg-on-dark hover:text-primary-light transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-12 flex items-center gap-8">
              <a
                href="#"
                aria-label="계정"
                className="text-fg-on-dark"
                onClick={() => setMobileOpen(false)}
              >
                <User size={28} strokeWidth={2} aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="장바구니"
                className="text-fg-on-dark"
                onClick={() => setMobileOpen(false)}
              >
                <ShoppingCart size={28} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
