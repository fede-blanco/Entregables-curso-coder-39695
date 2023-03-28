import { v4 as uuidv4 } from "uuid";
//clase que instancia objetos producto

function validateTitle(valor){
  if(typeof valor !== "string" ) throw new Error("no se ingresó el título - Product.js")
  if(!valor) throw new Error("no se ingresó el título - Product.js")
  return valor;
}
function validateDescription(valor){
  if(typeof valor !== "string" ) throw new Error("La descripción debe ser una cadena de caracteres - Product.js")
  if(!valor) throw new Error("no se ingresó la descripción - Product.js")
  return valor;
}
function validatePrice(valor){
  if(isNaN(Number(valor))) throw new Error("El precio solo lleva caracteres numericos - Product.js")
  if(!valor) throw new Error("no se ingresó el precio - Product.js")
  return valor;
}
function validateCode(valor){
  if(typeof valor !== "string" ) throw new Error("el código debe ser una cadena de caracteres - Product.js")
  if(!valor) throw new Error("no se ingresó el código - Product.js")
  return valor;
}
function validateStock(valor){
  if(isNaN(Number(valor))) throw new Error("El Stock solo lleva caracteres numericos - Product.js")
  if(!valor) throw new Error("no se ingresó el Stock - Product.js")
  if(!Number.isInteger(Number(valor))) throw new Error("El Stock solo puede ser un numero entero - Product.js")
  return valor;
}
function validateCategory(valor){
  if(typeof valor !== "string" ) throw new Error("la categoría debe ser una cadena de caracteres - Product.js")
  if(!valor) throw new Error("no se ingresó la categoría - Product.js")
  return valor;
}
// function validateId(valor){
//   if(!valor) {
//     valor = uuidv4();
//   }
//   return valor;
// }

export default class Product {
  title;
  description;
  price;
  thumbnails;
  code;
  stock;
  category;
  status;
  // id;

  constructor({
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    category,
    //status inicializa true
    status = true,
    // id,
  }) {
   
    // this.id = validateId(id);
    this.title = validateTitle(title);
    this.description = validateDescription(description);
    this.price = validatePrice(price);
    this.thumbnails = thumbnails;
    this.code = validateCode(code);
    this.stock = validateStock(stock);
    this.category = validateCategory(category);
    this.status = status;
    // return this;
  }
}
