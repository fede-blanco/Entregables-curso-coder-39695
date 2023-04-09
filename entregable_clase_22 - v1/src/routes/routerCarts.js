import { Router } from "express";
import { addCartController, addProdToCartByIdController, cartByIdController, deleteAllCartProductsController, deleteFullProductByIdController, updateCartProductByIdController, updateCartProductsByIdController } from "../controllers/api/carts.controller.js";

export const routerCarts = Router();



routerCarts.post("/", addCartController); // --> agrega un carrito al arreglo de "carts" de la base de datos

routerCarts.get("/:cid", cartByIdController); // --> devuelve un carrito seleccionado por id

routerCarts.post("/:cid/products/:pid", addProdToCartByIdController); // --> Agrega un producto seleccionado por id a un carrito seleccionado por id


routerCarts.delete("/:cid/products/:pid", deleteFullProductByIdController); //-->  elimina del carrito todas las existencias del producto seleccionado

routerCarts.put("/:cid", updateCartProductsByIdController); //--> actualiza el carrito con un arreglo de productos on el formato que brinda mongoose de { _id: valor, quantity: valor}

routerCarts.put("/:cid/products/:pid", updateCartProductByIdController); //--> actualiza solo la cantidad de ejemplares del producto por cualquier cantidad pasada desde el req.body

routerCarts.delete("/:cid", deleteAllCartProductsController) //--> elimina todos los productos del carrito

export default routerCarts;
