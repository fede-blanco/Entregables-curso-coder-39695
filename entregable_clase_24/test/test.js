import mongoose from "mongoose";
import { MONGODB_CNX_STR_LOCAL, MONGODB_CNX_STR_REMOTE } from "../src/config/mongodb.js";
import Product from "../src/models/Product.js";
import { productsService } from "../src/services/products.service.js";
import { cartsService } from "../src/services/carts.service.js";
import Cart from "../src/models/cart.js";


await mongoose.connect(MONGODB_CNX_STR_LOCAL)

const prodToAdd_1 = new Product({
  title: "Producto de prueba n°1",
  description: "Este es un producto de prueba",
  price: 1000,
  thumbnails: [],
  code:"test123",
  stock: 10,
  category: "home",
  status: true,
})
const prodToAdd_2 = new Product({
  title: "Producto de prueba n°2",
  description: "Este es un producto de prueba",
  price: 2000,
  thumbnails: [],
  code:"test12",
  stock: 10,
  category: "home",
  status: true,
})
const prodToAdd_3 = new Product({
  title: "Producto de prueba n°3",
  description: "Este es un producto de prueba",
  price: 3000,
  thumbnails: [],
  code:"test125",
  stock: 100,
  category: "home",
  status: true,
})

// const cartToAdd = new Cart({
//   products: {
//     prodToAdd_1,
//     prodToAdd_2
//   }
// })

// const prodsToAdd = {
//   prodToAdd_1,
//   prodToAdd_2
// }

// const prodUpdates = {
//   description: "Este es un producto de prueba modificado",
//   price: 2000
// }
// const prodId = '6422cb24389c6c4daa1fd69b'
// const prodId_2 = '6422cb24389c6c4daa1fd69e'
// const prodId_3 = '6422cb24389c6c4daa1fd6a0'
const cartId_1 = '64236b0a45aa64c315d42c3e'

// crea 3 productos
// export const registeredProduct1 = await productsService.addProduct(prodToAdd_1)
// export const registeredProduct2 = await productsService.addProduct(prodToAdd_2)
// export const registeredProduct3 = await productsService.addProduct(prodToAdd_3)

// export const modifiedProduct = await productsService.updateProduct(prodId, prodUpdates)
// export const deletedProduct = await productsService.deleteProduct(prodId)
// export const products = await productsService.getProducts()
// export const productById = await productsService.getProductById(prodId)
// console.log(products);
// console.log("*********************************");
// console.log(productById);
// console.log("----- Linea 22 test -----");
// console.log(registeredProduct);
// console.log("----- Linea 24 test -----");

// console.log("*********** CARTS **************");
// // Se crea carrito nuevo
// export const cart = await cartsService.addCart()
// console.log(cart);

// Se obtiene producto para saber el id (vendria de otro lado)
export const products = await productsService.getProducts()
// console.log("******** LINEA 86 - Test **************");
// console.log(products);
// console.log("******** LINEA 88 - Test **************");
console.log(products[0]._id);
const productId_1 = products[0]._id
const productId_2 = products[1]._id
const productId_3 = products[2]._id
// console.log("******** LINEA 93 - Test **************");
// console.log(productId_1);
// console.log(productId_2);
// console.log(productId_3);
// console.log("******** LINEA 97 - Test **************");

// // // se agrega el producto al carrito
// export const cartWithAddedProduct = await cartsService.addProductToCart(cartId_1,productId_1)
// console.log("******** LINEA 101 - Test **************");
// console.log(cartWithAddedProduct);
// console.log("******** LINEA 103 - Test **************");

// // // se agrega otro el producto al carrito
// export const cartWithAddedProduct2 = await cartsService.addProductToCart(cartId_1,productId_2)
// console.log("******** LINEA 107 - Test **************");
// console.log(cartWithAddedProduct2);
// console.log("******** LINEA 109 - Test **************");

// // // // verificamos el carrito
// console.log("******** LINEA 112 - Test **************");
// export const cartAdded = await cartsService.getCartById(cartId_1)
// console.log(JSON.stringify(cartAdded, null,'\t'));
// console.log(cartAdded);
// console.log("******** LINEA 115 - Test **************");
// console.log(cartAdded.products);
// console.log("******** LINEA 117 - Test **************");
// console.log(cartAdded.products[0]);
// console.log("******** LINEA 119 - Test **************");
// console.log(cartAdded.products[1]);

// Eliminamos un producto del carrito
console.log("******** LINEA 110 - Test **************");
export const prodRemoved = await cartsService.deleteProductFromCart(cartId_1,productId_2)
console.log(prodRemoved);

// // // verificamos el carrito
console.log("******** LINEA 114 - Test **************");
export const cartAdded2 = await cartsService.getCartById(cartId_1)
console.log(JSON.stringify(cartAdded2, null,'\t'));
console.log("******** LINEA 117 - Test **************");
console.log(cartAdded2.products);

// // se agrega otro el producto al carrito
// export const cartWithAddedProduct3 = await cartsService.addProductToCart(cartId_1,productId_3)
// console.log("******** LINEA 107 - Test **************");
// console.log(cartWithAddedProduct3);
// console.log("******** LINEA 109 - Test **************");

// verificamos el carrito
// console.log("******** LINEA 114 - Test **************");
// export const cartAdded3 = await cartsService.getCartById(cartId_1)
// console.log(JSON.stringify(cartAdded3, null,'\t'));
// console.log("******** LINEA 117 - Test **************");
// console.log(cartAdded3.products);

await mongoose.connection.close();
