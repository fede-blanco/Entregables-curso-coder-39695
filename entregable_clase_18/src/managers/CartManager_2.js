import { MongooseManager } from "./mongooseManager.js";

export const cartManager = new MongooseManager("carts", {
  products: {required: true }
})