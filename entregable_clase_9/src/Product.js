import { v4 as uuidv4 } from "uuid";
//clase que instancia objetos producto
export default class Product {
  title;
  description;
  price;
  thumbnails;
  code;
  stock;
  category;
  status;
  id;

  constructor({
    title = undefined,
    description = undefined,
    price = undefined,
    thumbnails = undefined,
    code = undefined,
    stock = undefined,
    category = undefined,
    //status inicializa true
    status = true,
    id = undefined,
  }) {
    if (title === undefined) throw new Error("Falta el título");
    if (description === undefined) throw new Error("Falta la descripción");
    if (price === undefined) throw new Error("Falta el precio");
    //thumbnails no es obligatorio
    // if (thumbnails === undefined) throw new Error("Faltan las thumnails");
    if (code === undefined) throw new Error("Falta el código");
    if (stock === undefined) throw new Error("Falta el stock");
    if (category === undefined) throw new Error("Falta la categoría");
    if (status === undefined) throw new Error("Falta el status");
    if (id === undefined) {
      this.id = uuidv4();
    } else {
      this.id = id;
    }
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnails = thumbnails;
    this.code = code;
    this.stock = stock;
    this.category = category;
    this.status = status;
    // return this;
  }
}
