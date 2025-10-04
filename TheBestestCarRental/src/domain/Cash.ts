// src/domain/Cash.ts
import { Payment } from "./Payment";
import type { PaymentReceipt } from "./Payment";

export class Cash extends Payment {
  constructor(amount: number, paymentID: string, public cashTendered: number) {
    super(amount, paymentID);
    if (cashTendered < amount) throw new Error("cashTendered must cover amount");
  }

  get change(): number {
    return Math.round((this.cashTendered - this.amount) * 100) / 100;
  }

  async charge(): Promise<PaymentReceipt> {
    this.timestamp = new Date();
    return {
      ok: true,
      method: "cash",
      id: this.paymentID,
      amount: this.amount,
      at: this.timestamp,
      meta: { change: this.change },
    };
  }

  async refund(partialAmount?: number): Promise<PaymentReceipt> {
    this.timestamp = new Date();
    return {
      ok: true,
      method: "cash-refund",
      id: this.paymentID,
      amount: partialAmount ?? this.amount,
      at: this.timestamp,
    };
  }
}

