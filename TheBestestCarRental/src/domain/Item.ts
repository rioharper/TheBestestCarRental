const round2 = (n: number) => Math.round(n * 100) / 100;

export class Item {
  constructor(
    public itemID: string,
    public description: string,
    public unitPrice: number,
    public weight: number
  ) {
    if (unitPrice < 0) throw new Error("unitPrice must be >= 0");
    if (weight < 0) throw new Error("weight must be >= 0");
  }

  getPriceForQuantity(qty: number): number {
    if (!Number.isInteger(qty) || qty <= 0) {
      throw new Error("qty must be a positive integer");
    }
    return round2(this.unitPrice * qty);
  }

  /** Weight of qty items (defaults to 1) */
  getWeight(qty: number = 1): number {
    if (!Number.isInteger(qty) || qty <= 0) {
      throw new Error("qty must be a positive integer");
    }
    return this.weight * qty;
  }
}
