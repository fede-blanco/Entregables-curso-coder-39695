import { productsManager } from "../managers/ProductManager.js";

class ProductsService {
  async addProduct(product) {
    const addedProduct = await productsManager.addProduct(product);
    return addedProduct
  }
  
}