import { Payment } from "./Payment";
import type { PaymentReceipt } from "./Payment";


export class WireTransfer extends Payment {
  constructor(
    amount: number,
    paymentID: string,
    public bankID: string,
    public bankName: string
  ) {
    super(amount, paymentID);
  }

  async charge(): Promise<PaymentReceipt> {
    this.timestamp = new Date();
    const confirmation = `WT-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
    return {
      ok: true,
      method: "wire",
      id: this.paymentID,
      amount: this.amount,
      at: this.timestamp,
      meta: { bankID: this.bankID, bankName: this.bankName, confirmation },
    };
  }

  async refund(partialAmount?: number): Promise<PaymentReceipt> {
    this.timestamp = new Date();
    return {
      ok: true,
      method: "wire-refund",
      id: this.paymentID,
      amount: partialAmount ?? this.amount,
      at: this.timestamp,
      meta: { bankID: this.bankID },
    };
  }
}
