import { Router } from "express";
import { cartManager } from "../managers/CartManager.js";
import { cartsService } from "../services/carts.service.js";

export const routerCarts = Router();

async function cartByIdController(req, res) {
  try {
    const idParam = req.params.cid;
    const cart = await cartsService.getCartById(idParam);
    res.json(cart);
  } catch (error) {
    throw new Error(`Error al buscar el producto con el id: ${idParam}`);
  }
}

async function addCartController(req, res) {
  try {
    const arrayWithNewCart = await cartsService.addCart();
    res.status(200).json({
      success: true,
      message: 'cart added successfully',
      cart: arrayWithNewCart
    })
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addProdToCartByIdController(req, res) {
  try {
    const cartIdParam = req.params.cid;
    const productId = req.params.pid;
    const cart = await cartsService.getCartById(cartIdParam);

    const productCreated = await cartsService.addProductToCart(
      cartIdParam,
      productId
    );

    res.status(200).json({
      success: true,
      message: 'Product added to cart successfully',
      cart: productCreated
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error adding product to cart'
    });
  }
}

async function deleteFullProductByIdController(req,res) {
  try {
    const cartId = req.params.cid
    const productId = req.params.pid

    const updatedCart = await cartsService.deleteFullProductFromCart(cartId, productId)
    res.status(200).json({
      success: true,
      message: 'Product deleted to cart successfully',
      cart: updatedCart
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product to cart'
    });
    throw new Error(`Error al eliminar producto al carrito - deleteFullProductByIdController - routerCart.js: ${error}`);
  }

}

async function updateCartProductsByIdController(req, res){
  try {
    const cartId = req.params.cid
    const productsArray = req.body

    // Valida que el array sea valido
    if (!Array.isArray(productsArray) || productsArray.length === 0) {
      return res.status(400).json({ message: 'Invalid products array' });
    }
  
    const updatedCart = await cartsService.updateCartProducts(cartId, productsArray)

    res.status(200).json({
      success: true,
      message: 'cart products updated successfully',
      cart: updatedCart
    });
    
  } catch (error) {
    throw new Error(`Error en updateCartProductsByIdController - routerCarts.js + ${error}`)
  }
}

async function updateCartProductByIdController (req,res){
  try {
    const cartId = req.params.cid
    const productId = req.params.pid
    const quantity = req.body.quantity

    const updatedCart = await cartsService.updateCartProductById(cartId,productId,quantity)

    res.status(200).json({
      success: true,
      message: 'cart product quantity updated successfully',
      cart: updatedCart
    })
    
  } catch (error) {
    throw new Error(`Error en updateCartProductByIdController - routerCarts.js + ${error}`)
  }
}

async function deleteAllCartProductsController (req,res) {
  try {
    const cartId = req.params.cid

    const cartWithDeletedProducts = await cartsService.deleteAllCartProducts(cartId)

    res.status(200).json({
      success: true,
      message: "Products from cart deleted Successfully",
      cart: cartWithDeletedProducts
    });

  } catch (error) {
    throw new Error(`Error en deleteAllCartProductsController - routerCarts.js + ${error}`)
  }
}

routerCarts.post("/", addCartController); // --> agrega un carrito al arreglo de "carts" de la base de datos

routerCarts.get("/:cid", cartByIdController); // --> devuelve un carrito seleccionado por id

routerCarts.post("/:cid/products/:pid", addProdToCartByIdController); // --> Agrega un producto seleccionado por id a un carrito seleccionado por id


routerCarts.delete("/:cid/products/:pid", deleteFullProductByIdController); //-->  elimina del carrito todas las existencias del producto seleccionado

routerCarts.put("/:cid", updateCartProductsByIdController); //--> actualiza el carrito con un arreglo de productos on el formato que brinda mongoose de { _id: valor, quantity: valor}

routerCarts.put("/:cid/products/:pid", updateCartProductByIdController); //--> actualiza solo la cantidad de ejemplares del producto por cualquier cantidad pasada desde el req.body

routerCarts.delete("/:cid", deleteAllCartProductsController) //--> elimina todos los productos del carrito

export default routerCarts;
