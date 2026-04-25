import { Container } from "@/app/components/ui/Container";

export const metadata = {
  title: "이용약관 - 시그널360",
};

export default function TermsPage() {
  return (
    <main className="flex-1 bg-white py-16">
      <Container>
        <div className="max-w-[820px] mx-auto flex flex-col gap-6">
          <h1 className="text-h2 text-fg">이용약관</h1>
          <p className="text-body text-muted">
            이용약관 본문은 준비 중입니다. 클라이언트 검토 완료 후 게시됩니다.
          </p>
        </div>
      </Container>
    </main>
  );
}
