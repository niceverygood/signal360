import { Fragment } from "react";
import Link from "next/link";
import { Container } from "@/app/components/ui/Container";

const companyInfo = {
  name: "이루다컴퍼니",
  ceo: "이주훈",
  businessNumber: "562-81-02354",
  address: "서울 구로구 디지털로 306, 대륭포스트타워 2차 316호",
  email: "seoulsignal360@gmail.com",
  copyrightYear: 2026,
};

const footerLinks = [
  { label: "이용약관", href: "/terms" },
  { label: "개인정보처리방침", href: "/privacy" },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-navy py-[60px]">
      <Container>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-7">
            <span className="text-h3 text-fg-on-dark tracking-tight">
              SIGNAL360
            </span>
            <div className="flex flex-col gap-3">
              <p className="text-lead text-fg-on-dark">{companyInfo.name}</p>
              <div className="flex flex-col text-caption text-muted-on-dark">
                <p>대표자 : {companyInfo.ceo}</p>
                <p>사업자등록번호 : {companyInfo.businessNumber}</p>
                <p>주소 : {companyInfo.address}</p>
                <p>메일 : {companyInfo.email}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-caption text-muted-on-dark">
            <p>
              Copyright © {companyInfo.copyrightYear} 이루다컴퍼니 All rights
              reserved
            </p>
            <div className="flex items-center gap-3">
              {footerLinks.map((link, i) => (
                <Fragment key={link.href}>
                  {i > 0 && <span aria-hidden="true">|</span>}
                  <Link
                    href={link.href}
                    className="hover:text-fg-on-dark transition-colors"
                  >
                    {link.label}
                  </Link>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
