import { Router } from "express";
import { addProductController, deleteProductController, productByIdController, productsController, updateProductController } from "../controllers/api/products.controller.js";

//se crea un Router
const routerProducts = Router();


routerProducts.get("/", productsController); // Devuelve La lista de productos existentes en la coleccion products

routerProducts.get("/:pid", productByIdController); //devuelve un producto Seleccionado mediante su id

routerProducts.post("/", addProductController); //agrega un producto a la colecciond de "products"

routerProducts.put("/:pid", updateProductController); // actualiza un producto de la coleccion de "products" de la base de datos

routerProducts.delete("/:pid", deleteProductController); // Elimina un producto de la coleccion "products"

export default routerProducts;
