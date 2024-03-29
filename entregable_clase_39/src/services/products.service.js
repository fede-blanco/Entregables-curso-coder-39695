import { productManager } from "../managers/ProductManager.js";
import Product from "../models/Product.js";
import { productsRepository } from "../repositories/products.repository.js";

//Capa de "services" para utilizar como intermediario entre la logica de negocio y el acceso a la base de datos para su proteccion

class ProductsService {


    async createProduct(product){
        const productCreated = new Product(product)
        return productCreated;
    }

  // Agrega producto - funciona
  async addProduct(product) {
    try {
    const prodToAdd = await this.createProduct(product)
    // console.log("***** linea 19 -- products.service.js");
    // console.log(prodToAdd);
    // console.log(prodToAdd.data());
    // console.log("***** linea 22 -- products.service.js");
      // await productManager.addProduct(product);
      const addedProd = await productsRepository.addProduct(prodToAdd);
      return addedProd
    } catch (error) {
      throw new Error(`Error en addProduct - products.service.js + ${error}`)
    }
  }
  
  // actualiza producto - funciona
  async updateProduct(productId, newProperties){
    try {
      // return await productManager.updateProductById(productId, newProperties)
      return await productsRepository.updateProduct(productId, newProperties)
      
    } catch (error) {
      throw new Error(`Error en updatetProduct - products.service.js + ${error}`)
      
    }
  }

  // Eliminar producto - funciona
  async deleteProduct(productId) {
    try {
      return await productsRepository.deleteProduct(productId)
      // return await productManager.deleteProduct(productId)
    } catch (error) {
      throw new Error(
        `Error: the product whith the id:${productId} do not exist in the array to delete it - Products.service.js`
      )
    }
  }

  //Buscar productos
  async getProducts(options){
    try {
      return await productsRepository.getProducts(options)
      // return await productManager.getProducts(options)
    } catch (error) {
      throw new Error(`Error al realizar getProducts: ${error}`)
    }
  }

   //Buscar producto por id
   async getProductById(productId){
     try {
       return await productsRepository.getProductById(productId)
      //  return await productManager.getProductById(productId)
     } catch (error) {
       throw new Error(
         `Error: the product whith the id:${productId} do not exist in the array!!`
       )
     }
   }



}

export const productsService = new ProductsService()