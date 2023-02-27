import { Router } from "express"
import { productsManager } from "../managers/ProductManager.js"

const viewsRouter = Router()

//Controla la acción de la url "/"
async function productsController(req, res) {
  try {
    if (req.query.limit) {
      const productsLimitAdquired = await productsManager.getProducts()
      const productsAdquired = productsLimitAdquired.slice(0, req.query.limit)
      res.render("index", {
        hayProductos: productsAdquired.length > 0,
        productsAdquired,
      })
    } else {
      const productsAdquired = await productsManager.getProducts()
      res.render("index", {
        hayProductos: productsAdquired.length > 0,
        productsAdquired,
      })
    }
  } catch {
    throw new Error(`Hubo un problema con get products`)
  }
}

async function realTimeProductsController(req, res) {
  try {
    const productsAdquired = await productsManager.getProducts()
    res.render("realTimeProducts", {
      hayProductos: productsAdquired.length > 0,
      productsAdquired, style:"index.css", title: "Productos en tiempo Real",
    })
  } catch (error) {
    console.log("Error!!!!!!!!!")
  }
}

// seria la url --> http://localhost:8080/
viewsRouter.get("/", productsController)

// seria la url --> http://localhost:8080/realtimeproducts
viewsRouter.get("/realtimeproducts", realTimeProductsController)

export default viewsRouter
