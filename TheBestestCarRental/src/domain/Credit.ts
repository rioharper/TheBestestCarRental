import { Payment } from "./Payment";
import type { PaymentReceipt } from "./Payment";


export class Credit extends Payment {
  constructor(
    amount: number,
    paymentID: string,
    public number: string,
    public type: string,
    public expireDate: string,
    public holderName: string,
    public authCode: string | null = null
  ) {
    super(amount, paymentID);
  }

  async charge(): Promise<PaymentReceipt> {
    this.timestamp = new Date();
    this.authCode = `AUTH-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    return {
      ok: true,
      method: "credit",
      id: this.paymentID,
      amount: this.amount,
      at: this.timestamp,
      meta: { authCode: this.authCode, type: this.type, last4: this.number.slice(-4) },
    };
  }

  async refund(partialAmount?: number): Promise<PaymentReceipt> {
    this.timestamp = new Date();
    return {
      ok: true,
      method: "credit-refund",
      id: this.paymentID,
      amount: partialAmount ?? this.amount,
      at: this.timestamp,
      meta: { originalAuthCode: this.authCode },
    };
  }
}

