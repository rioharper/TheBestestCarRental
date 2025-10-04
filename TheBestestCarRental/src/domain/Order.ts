import { OrderDetail } from "./OrderDetail";
import { Item } from "./Item";
import { OrderStatus } from "./OrderStatus";

const round2 = (n: number) => Math.round(n * 100) / 100;

export class Order {
  public createDate: Date;
  public status: OrderStatus;
  public totalAmount = 0;
  public lineItems: OrderDetail[] = [];

  constructor(date: Date = new Date(), status: OrderStatus = OrderStatus.CREATE) {
    this.createDate = date;
    this.status = status;
  }

  addLineItem(
    item: Item,
    qty: number,
    discount = 0,
    taxStatus: "taxable" | "nontaxable" = "taxable"
  ): void {
    const line = new OrderDetail(item, qty, taxStatus, discount);
    this.lineItems.push(line);
    this.recalculateTotals();
  }

  removeLineItem(index: number): void {
    if (index < 0 || index >= this.lineItems.length) return;
    this.lineItems.splice(index, 1);
    this.recalculateTotals();
  }

  recalculateTotals(): void {
    this.totalAmount = round2(
      this.lineItems.reduce((sum, li) => sum + li.calculateSubTotal(), 0)
    );
  }

  getTotalWeight(): number {
    return this.lineItems.reduce((sum, li) => sum + li.calculateWeight(), 0);
  }

  /** Move to the next legal status in the workflow */
  advanceStatus(): void {
    switch (this.status) {
      case OrderStatus.CREATE:
        this.status = OrderStatus.SHIPPING; break;
      case OrderStatus.SHIPPING:
        this.status = OrderStatus.DELIVERED; break;
      case OrderStatus.DELIVERED:
        this.status = OrderStatus.PAID; break;
      case OrderStatus.PAID:
        break;
    }
  }

  /** Validate explicit status changes */
  setStatus(next: OrderStatus): void {
    const allowed = new Set([
      `${OrderStatus.CREATE}->${OrderStatus.SHIPPING}`,
      `${OrderStatus.SHIPPING}->${OrderStatus.DELIVERED}`,
      `${OrderStatus.DELIVERED}->${OrderStatus.PAID}`,
    ]);
    const key = `${this.status}->${next}`;
    if (!allowed.has(key)) {
      throw new Error(
        `Illegal status change ${OrderStatus[this.status]} -> ${OrderStatus[next]}`
      );
    }
    this.status = next;
  }
}
