//Modelo de cart

export default class Cart {
  products;

  constructor(products) {
        if (products === undefined) {
      this.products = [];
    } else {
      this.products = products;
    }
    }
}