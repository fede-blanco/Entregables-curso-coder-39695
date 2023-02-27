import { Router } from "express";
import { cartsManager } from "../managers/CartManager.js";

export const routerCarts = Router();

async function cartByIdController(req, res) {
  try {
    const idParam = req.params.cid;
    const cart = await cartsManager.getCartById(idParam);
    res.json(cart);
  } catch (error) {
    console.log(`Error: el producto con el id: ${idParam} no está definido`);
    throw new Error(`Error al buscar el producto con el id: ${idParam}`);
  }
}

async function addCartController(req, res) {
  try {
    const arrayWithNewCart = await cartsManager.addCart();
    res.json(arrayWithNewCart);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addProdToCartByIdController(req, res) {
  try {
    const cartIdParam = req.params.cid;
    const prodIdParam = req.params.pid;
    const bodyProduct = req.body;
    const bodyProductId = req.body.id;
    const cart = await cartsManager.getCartById(cartIdParam);
    const product = cart.products.find((e) => e.product === prodIdParam);

    if (!product) {
      const productCreated = await cartsManager.addProdToCart(
        cartIdParam,
        bodyProductId
      );
    } else {
      const productUpdated = await cartsManager.updateCartProduct(
        cartIdParam,
        bodyProductId
      );
    }
  } catch (error) {}
}

routerCarts.post("/", addCartController);

routerCarts.get("/:cid", cartByIdController);

routerCarts.post("/:cid/products/:pid", addProdToCartByIdController);

export default routerCarts;
