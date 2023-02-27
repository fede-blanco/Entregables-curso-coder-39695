import { Router } from "express";
import { productsManager } from "../managers/ProductManager.js";

//se crea un Router
const routerProducts = Router();

//Controla la acción de la url "/api/products"
async function productsController(req, res) {
  try {
    if (req.query.limit) {
      const productsAdquired = await productsManager.getProducts();
      const productsWhitLimit = productsAdquired.slice(0, req.query.limit);
      res.json(productsWhitLimit);
    } else {
      const productsAdquired = await productsManager.getProducts();
      res.json(productsAdquired);
    }
  } catch {
    throw new Error(`Hubo un problema con get products`);
  }
}

async function productByIdController(req, res) {
  try {
    const idParam = req.params.pid;

    const product = await productsManager.getProductById(idParam);
    res.json(product);
  } catch (error) {
    console.log(`Error: el producto con el id: ${idParam} no está definido`);
    throw new Error(`Error al buscar el producto con el id: ${idParam}`);
  }
}

async function addProductController(req, res) {
  const productToAdd = req.body;
  try {
    const addedProduct = await productsManager.addProduct(productToAdd);
    res.status(201).json(addedProduct);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
}

async function updateProductController(req, res) {
  try {
    const productToUpdate = req.body;
    const productId = req.params.pid;
    const updatedProduct = await productsManager.updateProduct(
      productId,
      productToUpdate
    );
    res.json(updatedProduct);
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteProductController(req, res) {
  try {
    const prodToDeleteId = req.params.pid;
    const arrayWhithoutProduct = await productsManager.deleteProduct(
      prodToDeleteId
    );
  } catch (error) {
    throw new Error(error);
  }
}

routerProducts.get("/", productsController);

routerProducts.get("/:pid", productByIdController);

routerProducts.post("/", addProductController);

routerProducts.put("/:pid", updateProductController);

routerProducts.delete("/:pid", deleteProductController);

export default routerProducts;
