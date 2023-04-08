import mongoose from "mongoose"
import Product from "../models/Product.js";
// import Product from "../models/Product.js";
import mongoosePaginate from "mongoose-paginate-v2"

class ProductManager {
  collection
  constructor(productsDB){
    this.collection = productsDB;
  }

  //Funcion que agrega un producto a la coleccion "products"
  async addProduct(product){
    try {
      return await this.collection.create(product)
    } catch (error) {
      throw new Error(`Error en addProduct - ProductManager.js + ${error}`)
    }
  }
  
  //Funcion que elimina un producto a la coleccion "products"
  async deleteProduct(productId) {
    try {
      return await this.collection.deleteOne({_id: productId})
    } catch (error) {
      throw new Error(
        `Error: the product whith the id:${productId} do not exist in the array to delete it - ProductManager.js`
      )
    }
  }

  //Buscar productos --> version vieja sin paginate
  // async getProducts(){
  //   try {
  //     return await this.collection.find().lean()
  //   } catch (error) {
  //     throw new Error(`Error al realizar getProducts: ${error}`)
  //   }
  // }

  //Funcion que obtiene la lista ed productos de la coleccion "products"
  async getProducts(options) {
    try {
      const queryFilter = {}

      //aplico filto de caregoria o disponibilidad si se proporciona
      // si hay alguna option.query entra en el if
      if(options.query){
        // si query es "available"
        if (options.query === "available") {
          queryFilter.stock = { $gt: 0}
        } else if (options.query === "Cars" || options.query === "Kitchen" || options.query === "Home"){
          queryFilter.category = options.query
        }
      }

      const sort = {}

      //Aplicamos ordenamiento de precio si es proporcionado
      if(options.sort){
        if(options.sort === "asc") {
          sort.price = 1
        } else if (options.sort === "desc") {
          sort.price = -1
        }
      }

      const limit = options.limit || 10
      const page = options.page || 1

      //Buscamos los productos en la base de datos enviando como parametros de busqueda lo queries
      const result = await this.collection.paginate(queryFilter,{
        sort,
        limit,
        page,
        lean:true,
      })

      // Se crea un objeto con un formato especifico para devolver y luego utilizar en el front
      const objectToReturn = {
        docs: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage
          ? `${options.url}?page=${result.prevPage}&limit=${limit}&sort=${options.sort}`
          : null,
        nextLink: result.hasNextPage
          ? `${options.url}?page=${result.nextPage}&limit=${limit}&sort=${options.sort}`
          : null,
      }

      return objectToReturn;
      
    } catch (error) {
      throw new Error(`Error al realizar getProducts en el productManager: ${error}`)
    }
  }

  //Funcion que busca un producto en la base de datos mediante su id
  async getProductById(productId){
    try {
      return await this.collection.findOne({_id: productId}).lean()
    } catch (error) {
      throw new Error(
        `Error: the product whith the id:${productId} do not exist in the array!!`
      )
    }
  }

  //Funcion que modifica un producto existente en la coleccion "products"
  async updateProductById(productId, newProperties){
    try {
      const searchedProduct = await this.collection.findOne({_id: productId})

      if (!searchedProduct) {
        throw new Error(
          `Error: the product whith de id:${productId} do not exist in the array`
        )
      }

      //se crea un producto nuevo con las propiedades modificadas
      const updatedProduct = {
        title: newProperties.title || searchedProduct.title,
        description: newProperties.description || searchedProduct.description,
        price: newProperties.price || searchedProduct.price,
        thumbnails: newProperties.thumbnail || searchedProduct.thumbnail,
        stock: newProperties.stock || searchedProduct.stock,
        category: newProperties.category || searchedProduct.category,
        code: newProperties.code || searchedProduct.code,
        status: newProperties.status !== undefined ? newProperties.status : searchedProduct.status,
      }

      return await this.collection.updateOne({_id: productId}, updatedProduct)
      //otra opcion podria ser con updateOne: El segundo parámetro es el objeto que contiene los nuevos valores que se utilizarán para actualizar el documento.
      //Es importante tener en cuenta que updateOne no reemplaza completamente el documento como lo hace replaceOne, sino que solo actualiza los campos que se especifican en updatedProduct
      // return await Product.updateOne({_id: productId}, updatedProduct)

      //Codigo viejo con file system
      // await fs.promises.writeFile(
      //   this.path,
      //   JSON.stringify(this.products, null, 2)
      // )
    } catch (error) {
      throw new Error(
        `Error: the product whith de id:${productId} do not exist in the array!!!`
      )
    }
  }
}

// Schema de los productos a administrar
export const productSchema = new mongoose.Schema( {
  title: {type: String, required: true},
  description: {type: String,  required: true},
  price: {type: Number,  required: true, index: true}, //index:true (Genera una lista indexada)
  thumbnails: { type: Array, default: []},
  code: {type: String, required: true},
  stock: {type: Number, required: true},
  category: {type: String, required: true},
  //status inicializa true
  status: {type: Boolean, required: true, default: true},
}, {versionKey: false})

//se integra el plugin de "mongoose-paginate-v2"
productSchema.plugin(mongoosePaginate)

// Data Acces Object (DAO)
const productsDB = mongoose.model('products',productSchema)

//Se exporta Manager de persistencia de productos
export const productManager = new ProductManager(productsDB)