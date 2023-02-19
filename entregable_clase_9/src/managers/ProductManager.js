import fs from "fs";
import Product from "../Product.js";

//Clase FileManager que maneja Los objetos producto
class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async inicializarPersistencia() {
    if (this.products.length === 0) {
      try {
        await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
      } catch (error) {
        throw new Error(`Error al inicializar: ${this.path}`);
      }
    } else {
      return;
    }
  }

  async actualizarArrayDeProductos() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(data);
      const productsAdquired = [];

      for (let index = 0; index < this.products.length; index++) {
        const newProduct = new Product({ ...this.products[index] });
        productsAdquired.push(newProduct);
      }
      this.products = productsAdquired;
    } catch (error) {
      throw new Error(`Error al actualizar el array de productos: ${error}!!!`);
    }
  }

  // Agrega productos
  async addProduct({
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    category,
    status,
  }) {
    //valida que el codigo no esté repetido
    if (this.products.find((e) => e.code === code)) {
      throw new Error("Error, El código del producto ingresado está repetido");
    }

    try {
      await this.actualizarArrayDeProductos();
      const newProdToAdd = new Product({
        title,
        description,
        price,
        thumbnails,
        code,
        stock,
        category,
        status,
      });
      console.log(newProdToAdd);
      this.products.push(newProdToAdd);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2)
      );
      console.log(`Agregado el producto ID: ${newProdToAdd.id}`);

      return this.products;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProduct(productId) {
    try {
      await this.actualizarArrayDeProductos();
      //se verifica si hay alguna coincidencia con el id pasado por parámetro
      const searchedProduct = this.products.find(
        (product) => product.id === productId
      );

      if (!searchedProduct) {
        throw new Error(
          `Error: the product whith the id:${productId} do not exist in the array to delete it`
        );
      }

      const newArray = this.products.filter((e) => e.id !== productId);
      this.products = newArray;

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2)
      );
      console.log(`eliminado el producto ID: ${productId}`);
      return this.products;
    } catch (error) {
      throw new Error(
        `Error: the product whith the id:${productId} do not exist in the array to delete it`
      );
    }
  }

  async getProducts() {
    try {
      await this.actualizarArrayDeProductos();
      return this.products;
    } catch (error) {
      throw new Error(`Error al realizar getProducts: ${error}`);
    }
  }

  async getProductById(productId) {
    try {
      // se actualiza el array de productos con la info del archivo
      await this.actualizarArrayDeProductos();
      // //se verifica si hay alguna coincidencia con el id pasado por parámetro
      const searchedProduct = await this.products.find(
        (e) => e.id === productId
      );
      if (!searchedProduct) {
        throw new Error(
          `Error: the product whith the id:${productId} do not exist in the array`
        );
      }
      return searchedProduct;
    } catch (error) {
      throw new Error(
        `Error: the product whith the id:${productId} do not exist in the array!!`
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
      // let ProductPosition = this.products.indexOf(searchedProduct);

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
      if (newProperties.stock) {
        searchedProduct.stock = newProperties.stock;
      }
      if (newProperties.category) {
        searchedProduct.category = newProperties.category;
      }
      if (newProperties.code) {
        searchedProduct.code = newProperties.code;
      }
      if (newProperties.status) {
        searchedProduct.status = newProperties.status;
      }

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2)
      );
      console.log(`modificado y guardado el producto ID: ${productId}`);
      return searchedProduct;
    } catch (error) {
      throw new Error(
        `Error: the product whith de id:${productId} do not exist in the array!!!`
      );
    }
  }
}

export const productsManager = new ProductManager("src/database/products.json");
