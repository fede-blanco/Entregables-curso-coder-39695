import { productManager } from "../managers/ProductManager.js";

//Capa de "services" para utilizar como intermediario entre la logica de negocio y el acceso a la base de datos para su proteccion

class ProductsService {

  // Agrega producto - funciona
  async addProduct(product) {
    try {
      await productManager.addProduct(product);
      return product
    } catch (error) {
      throw new Error(`Error en addProduct - products.service.js + ${error}`)
    }
  }
  
  // actualiza producto - funciona
  async updateProduct(productId, newProperties){
    try {
      return await productManager.updateProductById(productId, newProperties)
      
    } catch (error) {
      throw new Error(`Error en updatetProduct - products.service.js + ${error}`)
      
    }
  }

  // Eliminar producto - funciona
  async deleteProduct(productId) {
    try {
      return await productManager.deleteProduct(productId)
    } catch (error) {
      throw new Error(
        `Error: the product whith the id:${productId} do not exist in the array to delete it - ProductManager.js`
      )
    }
  }

  //Buscar productos
  async getProducts(options){
    try {
      return await productManager.getProducts(options)
    } catch (error) {
      throw new Error(`Error al realizar getProducts: ${error}`)
    }
  }

   //Buscar producto por id
   async getProductById(productId){
     try {
       return await productManager.getProductById(productId)
     } catch (error) {
       throw new Error(
         `Error: the product whith the id:${productId} do not exist in the array!!`
       )
     }
   }



}

export const productsService = new ProductsService()