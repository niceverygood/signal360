import { test } from "node:test";
import assert from "node:assert/strict";
import {
  generateCancelHashString,
  generateEdiDate,
  generateHashString,
  verifySignData,
} from "../hash";

// Test fixtures from SeedPay 가맹점 연동 가이드 v0.9.8 (sample section).
const SAMPLE = {
  mid: "demotest0m",
  ediDate: "20210713151115",
  goodsAmt: "1004",
  tid: "demotest0m01012102151652573903",
  merchantKey:
    "BoBwBC4hRuMxAztw9p85L7K+SB7Iswd1tdRwca7xQ2sFftC5nYAFgYkOctQ1ubHzACV0YzaWHJdqWAGZW34kPw==",
  expectedApproveHash:
    "4684f4b322ae388e2e4c9a60309c66a472db61140e5cb8da085b1bd6dbb6f0c1",
  expectedCancelHash:
    "72c7ae86c76950513c9201506ae2df9dfa3d88f89b9dc490f56668f189f18ae5",
};

test("generateHashString matches docs sample (approve)", () => {
  const h = generateHashString(
    SAMPLE.mid,
    SAMPLE.ediDate,
    SAMPLE.goodsAmt,
    SAMPLE.merchantKey
  );
  assert.equal(h, SAMPLE.expectedApproveHash);
});

test("generateCancelHashString matches docs sample (cancel)", () => {
  const h = generateCancelHashString(
    SAMPLE.mid,
    SAMPLE.ediDate,
    SAMPLE.tid,
    SAMPLE.merchantKey
  );
  assert.equal(h, SAMPLE.expectedCancelHash);
});

test("generateEdiDate produces 14-digit yyyyMMddHHmmss in KST", () => {
  // KST 2026-04-26 15:30:45 → 20260426153045
  const fixed = new Date("2026-04-26T06:30:45.000Z"); // UTC, +9h KST
  assert.equal(generateEdiDate(fixed), "20260426153045");
  assert.match(generateEdiDate(), /^\d{14}$/);
});

test("verifySignData accepts the correct hash and rejects tampered", () => {
  const ordNo = "SG-20260426-0001";
  const sig = generateHashString(
    SAMPLE.tid + SAMPLE.mid,
    SAMPLE.ediDate,
    SAMPLE.goodsAmt + ordNo,
    SAMPLE.merchantKey
  );
  // Note above call uses generateHashString with concatenated strings to produce
  // SHA256(tid + mid + ediDate + goodsAmt + ordNo + merchantKey) since that's
  // the same byte sequence that verifySignData reconstructs internally.
  assert.equal(
    verifySignData(
      sig,
      SAMPLE.tid,
      SAMPLE.mid,
      SAMPLE.ediDate,
      SAMPLE.goodsAmt,
      ordNo,
      SAMPLE.merchantKey
    ),
    true
  );
  // Flip one char → must fail.
  const tampered = sig.replace(/^./, sig[0] === "f" ? "0" : "f");
  assert.equal(
    verifySignData(
      tampered,
      SAMPLE.tid,
      SAMPLE.mid,
      SAMPLE.ediDate,
      SAMPLE.goodsAmt,
      ordNo,
      SAMPLE.merchantKey
    ),
    false
  );
  // Wrong length → must fail (without throwing).
  assert.equal(
    verifySignData(
      "tooshort",
      SAMPLE.tid,
      SAMPLE.mid,
      SAMPLE.ediDate,
      SAMPLE.goodsAmt,
      ordNo,
      SAMPLE.merchantKey
    ),
    false
  );
});
