import { usersService } from "../services/users.service.js";


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
function validateOwner(valor){
    // console.log("******** linea 36 Product.js  *******");
    // console.log(valor);
    // console.log("******** linea 38 Product.js  *******");
    if(!valor){valor = "647f452ec51b6db597d98a0c"}
    // console.log("******** linea 40 Product.js  *******");
    // console.log(valor);
    // console.log("******** linea 42 Product.js  *******");
    // if(typeof valor !== "string" ) throw new Error("la categoría debe ser una cadena de caracteres - Product.js")
    //   if(!valor) throw new Error("no se ingresó la categoría - Product.js")

    // const user = await usersService.getUserById(valor)

    // console.log("******** linea 48 Product.js  *******");
    // console.log(valor);
    // console.log("******** linea 50 Product.js  *******");
    // console.log(user);
    // console.log("******** linea 52 Product.js  *******");
    // console.log(user.role);
    // console.log("******** linea 54 Product.js  *******");
    // if(user.role !== "admin" && user.role !== "premium"){
    //     throw new Error("El usuario debe ser premium para poder crear productos")
    // }
    // console.log(`El resultado es ${user.role} y deberia ser  "admin" o "premium"`);
  return valor;
}

export default class Product {
  title;
  description;
  price;
  thumbnails;
  code;
  stock;
  category;
  status;
  owner;

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
    owner,
  }) {
    this.title = validateTitle(title);
    this.description = validateDescription(description);
    this.price = validatePrice(price);
    this.thumbnails = thumbnails;
    this.code = validateCode(code);
    this.stock = validateStock(stock);
    this.category = validateCategory(category);
    this.status = status;
    this.owner = validateOwner(owner)
  }

    data() {
        return {
            title: this.title,
            description: this.description,
            price: this.price,
            thumbnails: this.thumbnails,
            code: this.code,
            stock: this.stock,
            category: this.category,
            status: this.status,
            owner: this.owner,
        }
    }

}
