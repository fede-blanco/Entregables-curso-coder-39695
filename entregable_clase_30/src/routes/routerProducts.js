import { Router } from "express";
import { addProductController, deleteProductController, productByIdController, productsController, updateProductController } from "../controllers/api/products.controller.js";
import { autenticacionJwtApi } from "../middlewares/passport.js";
import { RoleAuth } from "../middlewares/soloLogueados.js";

//se crea un Router
const routerProducts = Router();


routerProducts.get("/", productsController); // Devuelve La lista de productos existentes en la coleccion products

routerProducts.get("/:pid", productByIdController); //devuelve un producto Seleccionado mediante su id

routerProducts.post("/", autenticacionJwtApi, RoleAuth("admin"), addProductController); //agrega un producto a la colecciond de "products"

routerProducts.put("/:pid", autenticacionJwtApi, RoleAuth("admin"), updateProductController); // actualiza un producto de la coleccion de "products" de la base de datos

routerProducts.delete("/:pid", autenticacionJwtApi, RoleAuth("admin"), deleteProductController); // Elimina un producto de la coleccion "products"

export default routerProducts;
