# Signal360

보험설계사 대상 DB 매칭 플랫폼. Next.js 16 App Router + Supabase + Tailwind v4.

## Getting Started

```bash
npm install
npm run dev          # http://localhost:3000
```

`.env.local` 필요 (gitignored):
```
# === Supabase ===
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...           # 서버 전용 (RLS 우회)

# === SeedPay (PG) ===
SEEDPAY_MID=ONsig0001m                  # 운영 MID (이루다컴퍼니)
SEEDPAY_MERCHANT_KEY=...                # 본부장님이 4/28 카톡으로 공유
SEEDPAY_API_BASE=https://...            # ⚠️ 가이드 PDF에서 운영 URL 확인 필요
                                        #   (개발: https://devpay.seedpayments.co.kr)
SEEDPAY_WEBHOOK_ENFORCE_IP=false        # 시드페이 발신 IP 확인 후 true 권장

# === Site ===
NEXT_PUBLIC_SITE_URL=https://signal360.vercel.app    # 운영
                                                      # 로컬: http://localhost:3000
```

## Vercel 배포 환경변수 체크리스트 (운영)

Vercel Project → Settings → Environment Variables → Production 에 7개 등록:

| Key | 값 | 비고 |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | Supabase Settings → API |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | anon public key | 〃 |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key | 〃 (절대 클라 노출 X) |
| `SEEDPAY_MID` | `ONsig0001m` | 본부장 4/28 공유 |
| `SEEDPAY_MERCHANT_KEY` | `ZFr2fv/SYi...8Q==` | 본부장 4/28 공유 |
| `SEEDPAY_API_BASE` | **(가이드 PDF 확인)** | 운영 도메인. 안 넣으면 dev로 호출됨 |
| `NEXT_PUBLIC_SITE_URL` | `https://signal360.vercel.app` | 결제 returnUrl 베이스 |

> **SEEDPAY_API_BASE만 미확인 상태**입니다. 본부장님이 받으신 가이드 PDF
> (`가맹점 연동 가이드_20260414.zip`) 안에 운영(production) API 도메인이
> 명시돼 있을 겁니다. 보통 `https://pay.seedpayments.co.kr` 류로 추정되지만
> 정확한 값은 PDF에서 확인 후 입력해주세요.

## Database Schema

`supabase/migrations/0001_initial_schema.sql` — 7 tables, RLS, seed data, helper
functions (`is_admin()`, `generate_order_number()`).

Supabase Dashboard SQL Editor에 붙여넣고 Run.

## 첫 super_admin 등록

코드 배포 후 본인이 직접 처리:

1. **Supabase Auth에 사용자 생성**
   - Dashboard → Authentication → Users → "Add user"
   - Email + 강한 비밀번호 입력
   - "Auto Confirm User" 체크 (이메일 인증 스킵)

2. **`admin_users` 테이블에 super_admin 레코드 추가**

   Dashboard → SQL Editor:
   ```sql
   INSERT INTO public.admin_users (user_id, role, is_active)
   VALUES (
     (SELECT id FROM auth.users WHERE email = '본인 이메일'),
     'super_admin',
     true
   );
   ```

3. **로그인 확인**
   - https://signal360.vercel.app/admin/login (또는 로컬은 http://localhost:3000/admin/login)
   - 이메일 + 비밀번호 입력 → `/admin` 으로 이동되면 성공

추가 admin/staff 계정도 같은 흐름. `role`만 `'admin'` / `'staff'`로 바꾸면 됨.

## Routes

### Public
- `/` — 랜딩 페이지
- `/checkout?product=<slug>` — 결제 페이지
- `/checkout/success`, `/checkout/fail`
- `/terms`, `/privacy`
- `/login` — 카카오 로그인 (Supabase OAuth)
- `/account` — 회원 프로필 + 주문 내역
- `/auth/callback` — OAuth 콜백 핸들러
- `POST /auth/signout` — 로그아웃

### Admin
- `/admin/login` — 관리자 로그인
- `/admin` — 대시보드 (super_admin/admin/staff)
- `/admin/orders` — 주문 리스트 (필터 + 검색 + 페이지네이션)
- `/admin/orders/[id]` — 주문 상세 + 상태 변경 + 환불 + 배송
- `/admin/*` — `proxy.ts`에서 인증 + admin_users 검증

### API
- `POST /api/payment/request` — 결제 시작 (orders + payments INSERT)
- `POST /api/payment/approve` — SeedPay returnUrl 핸들러
- `POST /api/payment/webhook` — 결제 통보 (멱등성, IP 제한 옵션)

## Tech Stack

- Next.js 16.2 (App Router, Turbopack 기본, `proxy.ts` for middleware)
- React 19
- Tailwind CSS v4 (`@theme` tokens in `app/globals.css`)
- TypeScript 5
- Supabase (Auth, Postgres, RLS)
- Embla Carousel, Radix Accordion, Lucide Icons
- Pretendard Variable (next/font/local)
