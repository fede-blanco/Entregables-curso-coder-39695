import fs from "fs";
import { Product } from "./Product.js";

//Clase ProductManager que maneja Los objetos producto
export class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async inicializarPersistencia() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
    } catch (error) {
      throw new Error(`Error al inicializar: ${this.path}`);
    }
  }

  async actualizarArrayDeProductos() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(data);
    } catch (error) {
      throw new Error(`Error al actualizar el array de productos: ${error}`);
    }
  }

  async addProduct({ title, description, price, thumbnail, code, stock, id }) {
    //valida que el codigo no esté repetido
    if (this.products.find((e) => e.code === code)) {
      throw new Error("Error, El código del producto ingresado está repetido");
      // return console.error('Error, El código está repetido');
    }

    //if que verifica si el array esta vacío y le da el id = 1 al producto o le da el valor del id dependiendo de la longitud del array
    if (this.products.length === 0) {
      id = 1;
    } else {
      id = this.products.length + 1;
    }

    //valida que se hayan ingresado todos los datos del producto para funcionar
    if (
      title === undefined ||
      description === undefined ||
      price === undefined ||
      thumbnail === undefined ||
      code === undefined ||
      stock === undefined ||
      id === undefined
    ) {
      throw new Error("Error, falta alguna de las propiedades del producto");
      // console.error("Uno de los campos no fue completado");
    } else {
      try {
        await this.actualizarArrayDeProductos();
        this.products.push(
          new Product({ title, description, price, thumbnail, code, stock, id })
        );
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products, null, 2)
        );
        console.log(`Agregado el producto ID: ${id}`);
      } catch (error) {
        throw new Error(
          `Error al realizar addProducts --> Producto: ${title} id: ${id}`
        );
      }
    }
  }

  async deleteProduct(productId) {
    try {
      await this.actualizarArrayDeProductos();
      // //se verifica si hay alguna coincidencia con el id pasado por parámetro
      const searchedProduct = this.products.find(
        (product) => product.id === productId
      );

      if (!searchedProduct) {
        throw new Error(
          `Error: the product whith the id:${productId} do not exist in the array to delete it`
        );
      }

      const newArray = this.products.splice(
        this.products.indexOf(searchedProduct) - 1,
        1
      );
      this.products = newArray;

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2)
      );
      console.log(`eliminado el producto ID: ${productId}`);
    } catch (error) {
      throw new Error(
        `Error: the product whith the id:${productId} do not exist in the array to delete it`
      );
    }
  }

  async getProducts() {
    try {
      if (this.products.length === 0) {
        // await this.inicializarPersistencia();
        await this.actualizarArrayDeProductos();
        return this.products;
      } else {
        await this.actualizarArrayDeProductos();
        return this.products;
      }
    } catch (error) {
      throw new Error(`Error al realizar getProducts: ${error}`);
    }
  }

  async getProductById(productId) {
    try {
      // se actualiza el array de productos con la info del archivo
      await this.actualizarArrayDeProductos();
      // //se verifica si hay alguna coincidencia con el id pasado por parámetro
      const searchedProduct = this.products.find(
        (product) => product.id === productId
      );
      if (!searchedProduct) {
        throw new Error(
          `Error: the product whith the id:${productId} do not exist in the array`
        );
      }
      return searchedProduct;
    } catch (error) {
      throw new Error(
        `Error: the product whith the id:${productId} do not exist in the array!`
      );
    }
  }

  async updateProduct(productId, newProperties) {
    try {
      // se actualiza el array de productos con la info del archivo
      await this.actualizarArrayDeProductos();
      // //se verifica si hay alguna coincidencia con el id pasado por parámetro
      const searchedProduct = this.products.find(
        (product) => product.id === productId
      );

      //se busca el indice del producto a modificar
      let ProductPosition = this.products.indexOf(searchedProduct);

      if (!searchedProduct) {
        throw new Error(
          `Error: the product whith de id:${productId} do not exist in the array`
        );
      }

      //reemplaza valores del searchedProduct si los encuentra en "newProperties" (producto  a modificar)
      if (newProperties.title) {
        searchedProduct.title = newProperties.title;
      }
      if (newProperties.description) {
        searchedProduct.description = newProperties.description;
      }
      if (newProperties.price) {
        searchedProduct.price = newProperties.price;
      }
      if (newProperties.thumbnail) {
        searchedProduct.thumbnail = newProperties.thumbnail;
      }
      if (newProperties.code) {
        searchedProduct.code = newProperties.code;
      }
      if (newProperties.stock) {
        searchedProduct.stock = newProperties.stock;
      }

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2)
      );
      console.log(`modificado el producto ID: ${productId}`);
    } catch (error) {
      throw new Error(
        `Error: the product whith de id:${productId} do not exist in the array!!!`
      );
    }
  }
}
