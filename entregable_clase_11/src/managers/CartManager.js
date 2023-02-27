import fs from "fs";
import Cart from "../Cart.js";

class CartManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.carts = [];
  }

  async inicializarPersistencia() {
    if (this.carts.length === 0) {
      try {
        await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
      } catch (error) {
        throw new Error(`Error al inicializar: ${this.path}`);
      }
    } else {
      return;
    }
  }

  async actualizarArrayDeCarritos() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      this.carts = JSON.parse(data);
      const cartsAdquired = [];

      for (let index = 0; index < this.carts.length; index++) {
        const thisCart = this.carts[index];
        const newCart = new Cart(thisCart.id, thisCart.products);
        cartsAdquired.push(newCart);
      }
      this.carts = cartsAdquired;
    } catch (error) {
      throw new Error(`Error al actualizar el array de productos: ${error}`);
    }
  }

  async getCarts() {
    try {
      await this.actualizarArrayDeCarritos();
      return this.carts;
    } catch (error) {
      throw new Error(`Error al realizar getProducts: ${error}`);
    }
  }

  async getCartById(cartId) {
    try {
      // se actualiza el array de carritos con la info del archivo
      await this.actualizarArrayDeCarritos();
      // //se verifica si hay alguna coincidencia con el id pasado por parámetro
      const searchedCart = await this.carts.find((cart) => cart.id === cartId);
      if (!searchedCart) {
        throw new Error(
          `Error: the product whith the id:${cartId} do not exist in the array`
        );
      }
      return searchedCart;
    } catch (error) {
      throw new Error(
        `Error: the product whith the id:${cartId} do not exist in the array!!`
      );
    }
  }

  // Agrega un carrito
  async addCart() {
    try {
      await this.actualizarArrayDeCarritos();

      const newCartToAdd = new Cart();

      this.carts.push(newCartToAdd);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.carts, null, 2)
      );
      console.log(`Agregado el carrito ID: ${newCartToAdd.id}`);
      //Lo retorna para poder utlizarlo nuevamente en el router
      return this.carts;
    } catch (error) {
      throw new Error(
        `Error al realizar addProducts --> Producto: ${title} id: ${id}`
      );
    }
  }

  async addProdToCart(cartIdParam, bodyProductId) {
    const productToAdd = {
      product: bodyProductId,
      quantity: 1,
    };
    const cartSelected = this.carts.find((e) => e.id === cartIdParam);
    cartSelected.products.push(productToAdd);
    await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
  }

  async updateCartProduct(cartIdParam, bodyProductId) {
    const cartSelected = this.carts.find((e) => e.id === cartIdParam);
    const productSelected = cartSelected.products.find(
      (e) => e.product === bodyProductId
    );
    productSelected.quantity = productSelected.quantity + 1;
    await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
  }
}

export const cartsManager = new CartManager("src/database/carts.json");
