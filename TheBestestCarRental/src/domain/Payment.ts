// src/domain/Payment.ts
export type PaymentReceipt = {
    ok: boolean;
    method: string;
    id: string;
    amount: number;
    at: Date;
    meta?: Record<string, unknown>;
  };
  
  export abstract class Payment {
    public timestamp: Date | null = null;
  
    constructor(public amount: number, public paymentID: string) {
      if (amount < 0) throw new Error("amount must be >= 0");
    }
  
    abstract charge(): Promise<PaymentReceipt>;
    abstract refund(partialAmount?: number): Promise<PaymentReceipt>;
  }
  