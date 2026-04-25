import "server-only";
import { generateCancelHashString, generateEdiDate } from "./hash";
import type {
  CancelRequest,
  CancelResponse,
  PaymentApproveRequest,
  PaymentApproveResponse,
} from "./types";

const TIMEOUT_MS = 30_000;
const SEEDPAY_API_BASE =
  process.env.SEEDPAY_API_BASE || "https://devpay.seedpayments.co.kr";

function requireConfig() {
  const mid = process.env.SEEDPAY_MID;
  const merchantKey = process.env.SEEDPAY_MERCHANT_KEY;
  if (!mid) throw new Error("SEEDPAY_MID env var is not set");
  if (!merchantKey) throw new Error("SEEDPAY_MERCHANT_KEY env var is not set");
  return { mid, merchantKey };
}

export class PaymentError extends Error {
  constructor(
    public code: string,
    message: string,
    public response?: unknown
  ) {
    super(`[SeedPay ${code}] ${message}`);
    this.name = "PaymentError";
  }
}

async function postUrlEncoded(
  url: string,
  params: Record<string, string>
): Promise<unknown> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(params).toString(),
      signal: ac.signal,
    });
  } catch (err) {
    clearTimeout(timer);
    if (err instanceof Error && err.name === "AbortError") {
      throw new PaymentError(
        "TIMEOUT",
        `Request to ${url} timed out after ${TIMEOUT_MS}ms`
      );
    }
    throw new PaymentError("NETWORK", `Network error: ${(err as Error).message}`);
  }
  clearTimeout(timer);

  const text = await res.text();
  if (!res.ok) {
    throw new PaymentError(
      String(res.status),
      `HTTP ${res.status} ${res.statusText}: ${text.slice(0, 200)}`
    );
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new PaymentError(
      "PARSE",
      `Invalid JSON response: ${text.slice(0, 200)}`
    );
  }
}

/**
 * Approve a payment after the user completes 인증 in the SeedPay window.
 * `approvalUrl` comes from PaymentReturnData.approvalUrl — do NOT hardcode.
 */
export async function approvePayment(
  approvalUrl: string,
  body: PaymentApproveRequest
): Promise<PaymentApproveResponse> {
  const result = (await postUrlEncoded(
    approvalUrl,
    body as unknown as Record<string, string>
  )) as PaymentApproveResponse;
  if (result.resultCd !== "0000") {
    throw new PaymentError(result.resultCd, result.resultMsg, result);
  }
  return result;
}

/**
 * Cancel a payment (full or partial).
 * `amount === undefined` → full cancel (partCanFlg = '0').
 */
export async function cancelPayment(
  tid: string,
  reason: string,
  amount?: number
): Promise<CancelResponse> {
  const { mid, merchantKey } = requireConfig();
  const ediDate = generateEdiDate();
  const hashString = generateCancelHashString(mid, ediDate, tid, merchantKey);

  const body: CancelRequest = {
    tid,
    mid,
    ccAmt: amount === undefined ? "0" : String(amount),
    ccMsg: reason,
    partCanFlg: amount === undefined ? "0" : "1",
    ediDate,
    hashString,
  };

  const url = `${SEEDPAY_API_BASE}/payment/v1/cancel`;
  const result = (await postUrlEncoded(
    url,
    body as unknown as Record<string, string>
  )) as CancelResponse;

  if (result.resultCd !== "0000") {
    throw new PaymentError(result.resultCd, result.resultMsg, result);
  }
  return result;
}
