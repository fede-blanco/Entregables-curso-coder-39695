import mongoose from "mongoose";
// Mongodb pass: entregascoder94
import {MONGODB_CNX_STR} from "../config/server.js"

await mongoose.connect(MONGODB_CNX_STR)

export const productSchema = new mongoose.Schema( {
  title: {type: String, required: true},
  description: {type: String,  required: true},
  price: {type: Number,  required: true},
  thumbnails: { required: false},
  code: {type: String, required: true},
  stock: {type: Number, required: true},
  category: {type: String, required: true},
  //status inicializa true
  status: {type: Boolean, required: true},
}, {versionKey: false})

export const cartSchema = new mongoose.Schema({
  products: {required: true }
}, {versionKey: false})

// data acces object - DAO
export const productsCollection = mongoose.model('products', productSchema)
export const cartsCollection = mongoose.model('carts', cartSchema)

// export class MongooseManager {
//   constructor(collectionName, schema) {
//     this.collection = mongoose.model(collectionName, new mongoose.Schema(schema, { versionKey: false }))
//   }

//   async saveData(data) {
//     return await this.collection.create(data)
//   }
// }



// import mongoose from 'mongoose'

// export class ManagerMongoose {
//     constructor(nombreColeccion, schema) {
//         this.coleccion = mongoose.model(nombreColeccion, new mongoose.Schema(schema, { versionKey: false }))
//     }
//     async guardar(registro) {
//         return await this.coleccion.create(registro)
//     }
//     async obtenerTodos() {
//         return await this.coleccion.find({}).lean()
//     }
// }