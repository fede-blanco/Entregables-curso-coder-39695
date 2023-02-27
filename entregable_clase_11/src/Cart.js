import { v4 as uuidv4 } from "uuid";
//clase que instancia objetos Cart
export default class Cart {
  id;
  products;

  constructor(id, products) {
    if (id === undefined) {
      this.id = uuidv4();
    } else {
      this.id = id;
    }

    if (products === undefined) {
      this.products = [];
    } else {
      this.products = products;
    }
  }
}
