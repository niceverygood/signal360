import crypto from "node:crypto";

function sha256Hex(input: string): string {
  return crypto.createHash("sha256").update(input, "utf8").digest("hex");
}

/**
 * Approve / payment-window hashString.
 * Formula: SHA256(mid + ediDate + goodsAmt + merchantKey)
 * Verified against SeedPay 가맹점 연동 가이드 v0.9.8 sample.
 */
export function generateHashString(
  mid: string,
  ediDate: string,
  goodsAmt: string,
  merchantKey: string
): string {
  return sha256Hex(mid + ediDate + goodsAmt + merchantKey);
}

/**
 * Cancel-specific hashString.
 * Formula: SHA256(mid + ediDate + tid + merchantKey)
 */
export function generateCancelHashString(
  mid: string,
  ediDate: string,
  tid: string,
  merchantKey: string
): string {
  return sha256Hex(mid + ediDate + tid + merchantKey);
}

/** ediDate in `yyyyMMddHHmmss` format, KST (UTC+9). */
export function generateEdiDate(now: Date = new Date()): string {
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const yyyy = kst.getUTCFullYear();
  const mm = String(kst.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(kst.getUTCDate()).padStart(2, "0");
  const hh = String(kst.getUTCHours()).padStart(2, "0");
  const mi = String(kst.getUTCMinutes()).padStart(2, "0");
  const ss = String(kst.getUTCSeconds()).padStart(2, "0");
  return `${yyyy}${mm}${dd}${hh}${mi}${ss}`;
}

/**
 * Verify signData received at returnUrl.
 * Formula: SHA256(tid + mid + ediDate + goodsAmt + ordNo + merchantKey)
 * (Per SeedPay docs v0.9.8 — note ordNo is included.)
 * Uses constant-time comparison to prevent timing attacks.
 */
export function verifySignData(
  receivedSignData: string,
  tid: string,
  mid: string,
  ediDate: string,
  goodsAmt: string,
  ordNo: string,
  merchantKey: string
): boolean {
  const expected = sha256Hex(
    tid + mid + ediDate + goodsAmt + ordNo + merchantKey
  );
  const a = Buffer.from(receivedSignData, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
