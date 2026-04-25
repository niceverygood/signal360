// SeedPay payment integration types.
// Based on SeedPay 가맹점 연동 가이드 v0.9.8 (일반결제 / 인증결제).

export const PaymentResultCode = {
  SUCCESS: "0000",
} as const;

/** Method values posted to the payment window form. */
export type SeedPayMethod = "ALL" | "CARD" | "BANK" | "VACNT";

/** Encoded method returned in the returnUrl payload. */
export type SeedPayMethodCode = "01" | "02" | "03"; // 01=card, 02=bank, 03=vacnt

/** Form fields posted to SeedPay's payment window via pgAsistant.js SendPay(). */
export type PaymentRequestParams = {
  method: SeedPayMethod;
  mid: string;
  goodsNm: string;
  ordNo: string;
  goodsAmt: string;
  ordNm: string;
  ordEmail?: string;
  ordTel?: string;
  ordIp?: string;
  mbsUsrId?: string;
  mbsReserved?: string;
  returnUrl: string;
  ediDate: string;
  /** SHA256(mid + ediDate + goodsAmt + merchantKey) */
  hashString: string;
};

/** POST body received at returnUrl after the user completes 인증. */
export type PaymentReturnData = {
  resultCd: string;
  resultMsg: string;
  nonce: string;
  tid: string;
  mid: string;
  method: SeedPayMethodCode;
  ordNo: string;
  goodsAmt: string;
  mbsReserved?: string;
  ediDate: string;
  payData: string;
  /** SHA256(tid + mid + ediDate + goodsAmt + ordNo + merchantKey) — verify before approving. */
  signData: string;
  /** URL the merchant POSTs the approval body to. Comes from PG, do NOT hardcode. */
  approvalUrl: string;
  netCancelUrl: string;
};

/** Body for the approval POST. URL = PaymentReturnData.approvalUrl. */
export type PaymentApproveRequest = {
  nonce: string;
  tid: string;
  mid: string;
  goodsAmt: string;
  ediDate: string;
  mbsReserved?: string;
  /** SHA256(mid + ediDate + goodsAmt + merchantKey) */
  hashString: string;
  payData: string;
};

/** Approval response from SeedPay (JSON). */
export type PaymentApproveResponse = {
  resultCd: string;
  resultMsg: string;
  tid: string;
  mid: string;
  ordNo: string;
  goodsAmt: string;
  ediDate: string;
  payMethod?: string;
  cardCd?: string;
  cardNm?: string;
  cardNo?: string;
  quota?: string;
  appNo?: string;
  appDate?: string;
  appTime?: string;
  mbsReserved?: string;
  // Catch-all for fields we haven't explicitly mapped yet.
  [key: string]: string | undefined;
};

/** Cancel request body. */
export type CancelRequest = {
  tid: string;
  mid: string;
  ccAmt: string;
  ccMsg: string;
  /** '0' = full cancel, '1' = partial cancel. */
  partCanFlg: "0" | "1";
  ediDate: string;
  /** SHA256(mid + ediDate + tid + merchantKey) */
  hashString: string;
};

/** Cancel response (JSON). */
export type CancelResponse = {
  resultCd: string;
  resultMsg: string;
  tid?: string;
  ccAmt?: string;
  ccDate?: string;
  ccTime?: string;
  [key: string]: string | undefined;
};

/** Payload received from SeedPay's webhook (결제 통보). */
export type PaymentWebhookData = {
  resultCd: string;
  resultMsg: string;
  tid: string;
  mid: string;
  ordNo: string;
  goodsAmt: string;
  ediDate: string;
  payMethod?: string;
  signData: string;
  [key: string]: string | undefined;
};
