import { Item } from "./Item";

const round2 = (n: number) => Math.round(n * 100) / 100;

export class OrderDetail {
  constructor(
    public item: Item,
    public qty: number,
    /** optional tax flag used later if you add tax calc */
    public taxStatus: "taxable" | "nontaxable" = "taxable",
    /** absolute $ discount on this line */
    public discount: number = 0
  ) {
    if (!Number.isInteger(qty) || qty <= 0) throw new Error("qty must be > 0");
    if (discount < 0) throw new Error("discount must be >= 0");
  }

  calculateSubTotal(): number {
    const raw = this.item.getPriceForQuantity(this.qty);
    const subtotal = Math.max(0, raw - this.discount);
    return round2(subtotal);
  }

  calculateWeight(): number {
    return this.item.getWeight(this.qty);
  }
}
