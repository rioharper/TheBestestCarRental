export type DateRange = { start: Date; end: Date };
const overlaps = (a: DateRange, b: DateRange) => a.start < b.end && b.start < a.end;

export class Car {
  public reservations: DateRange[] = [];

  constructor(
    public id: string,
    public make: string,
    public year: number,
    public size: string, // sedan, suv, etc.
    public color: string,
    public available: boolean = true
  ) {}

  isAvailableOn(range: DateRange): boolean {
    if (!this.available) return false;
    return !this.reservations.some(r => overlaps(r, range));
  }

  reserve(range: DateRange): void {
    if (!this.isAvailableOn(range)) throw new Error("Car not available for that range");
    this.reservations.push(range);
  }

  release(range: DateRange): void {
    this.reservations = this.reservations.filter(
      r => !(r.start.getTime() === range.start.getTime() && r.end.getTime() === range.end.getTime())
    );
  }
}
