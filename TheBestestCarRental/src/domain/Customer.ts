export class Customer {
    constructor(
      public name: string,
      public deliveryAddress: string,
      public contact: string,
      public active: boolean = true
    ) {}
  
    activate() { this.active = true; }
    deactivate() { this.active = false; }
  }
  