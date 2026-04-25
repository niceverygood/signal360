import { ImagePlaceholder } from "@/app/components/ui/ImagePlaceholder";
import { StatItem } from "@/app/components/ui/StatItem";

export function Section3() {
  return (
    <section id="stats" className="relative bg-navy xl:h-[433px]">
      <div className="relative h-[280px] xl:absolute xl:right-0 xl:top-0 xl:w-1/2 xl:h-full">
        <ImagePlaceholder
          fill
          width={976}
          height={433}
          variant="dark"
          rounded="none"
          label="동전 + 성장 차트 (Figma image 1392)"
        />
      </div>
      <div className="relative z-10 px-6 py-16 xl:py-0 xl:h-full xl:flex xl:flex-col xl:justify-center xl:pl-12 2xl:pl-[360px]">
        <div className="flex flex-col gap-20 max-w-[539px]">
          <h2 className="text-h2 text-fg-on-dark">
            숫자는 거짓말을
            <br />
            하지 않습니다.
          </h2>
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-[60px]">
            <StatItem size="sm" value="40%" label="평균 만남율" />
            <div
              className="hidden md:block w-px h-16 bg-muted-on-dark/30 self-start"
              aria-hidden="true"
            />
            <StatItem size="sm" value="70%" label="평균 계약 전환율" />
            <div
              className="hidden md:block w-px h-16 bg-muted-on-dark/30 self-start"
              aria-hidden="true"
            />
            <StatItem
              size="sm"
              value="100↑"
              label={
                <>
                  자사의 DB로
                  <br />
                  월 납 보험료
                </>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
