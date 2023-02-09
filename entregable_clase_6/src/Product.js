//clase Que instancia objetos producto
export class Product {
  title;
  description;
  price;
  thumbnail;
  code;
  stock;
  id;

  constructor({
    title = undefined,
    description = undefined,
    price = undefined,
    thumbnail = undefined,
    code = undefined,
    stock = undefined,
    id,
  }) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = id;
    // return this;
  }
}
