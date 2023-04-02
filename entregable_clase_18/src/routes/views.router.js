import { Router } from "express"
import { productManager } from "../managers/ProductManager.js"
import { cartsService } from "../services/carts.service.js"
import { productsService } from "../services/products.service.js"

const viewsRouter = Router()

// // Controla la acción de la url "/" ---> version anterior (sin modificar)
async function productsController(req, res) {

  try {
    const options = {
      //variables que se van a conseguir de los parametros pasador por el url
      limit : req.query.limit || 10,
      page : req.query.page || 1,
      sort : req.query.sort || null,
      query : req.query.query || null,
      url: req.originalUrl.split("?")[0] || req.originalUrl,
    }

    const products = await productsService.getProducts(options)

    const response = {
      status: "success",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.prevLink,
      nextLink: products.nextLink,
    }

    res.render ("index", {
      hayProductos: response.payload.length > 0,
      response
    })

  } catch (error) {
    throw new Error(`Hubo un problema con get products`)
  }
}

async function realTimeProductsController(req, res) {
  try {
    const options = {
      //variables que se van a conseguir de los parametros pasador por el url
      limit : req.query.limit || 10,
      page : req.query.page || 1,
      sort : req.query.sort || null,
      query : req.query.query || null,
      url: req.originalUrl.split("?")[0] || req.originalUrl,
    }

    const products = await productsService.getProducts(options)

    const response = {
      status: "success",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.prevLink,
      nextLink: products.nextLink,
    }
    const carts = await cartsService.getCarts()
    const cartSelected = carts[0]
    const cartSelectedId = cartSelected._id
    
    const cartResponse = {
      status: "success",
      payload: cartSelected.products,
    }

    res.render("realTimeProducts", {
      hayProductos: response.payload.length > 0,
      hayProductosCart: cartResponse.payload.length > 0,
      response,
      cartResponse,
      style:"index.css",
      title: "Productos en tiempo Real",
      cartSelectedId
    })
  } catch (error) {
    throw new Error(`Error en realTimeProductsController - views.router.js ${error}`)
  }
}

async function productsViewController(req, res) {
  try {
    const options = {
      //variables que se van a conseguir de los parametros pasador por el url
      limit : req.query.limit || 10,
      page : req.query.page || 1,
      sort : req.query.sort || null,
      query : req.query.query || null,
      url: req.originalUrl.split("?")[0] || req.originalUrl,
    }

    const products = await productsService.getProducts(options)

    const response = {
      status: "success",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.prevLink,
      nextLink: products.nextLink,
    }

    if(options.page > response.totalPages){
      throw new Error(`Se ingreso un numero de pagina mayor a la cantidad de paginas de productos existentes - El maximo es: " ${response.totalPages} "`)
    }



    const carts = await cartsService.getCarts()
    const cartSelected = carts[0]
    const cartSelectedId = cartSelected._id
    
    const cartResponse = {
      status: "success",
      payload: cartSelected.products,
    }

    res.render("products", {
      hayProductos: response.payload.length > 0,
      hayProductosCart: cartResponse.payload.length > 0,
      response,
      cartResponse,
      style:"index.css",
      title: "Vista con listado de Productos y Paginacion",
      cartSelectedId
    })
  } catch (error) {
    throw new Error(`Hubo un error en viewsProductsController - views.router.js ${error}`)
  }
}

async function cartViewController(req, res) {
  try {
    const cartId = req.params.cid;
      const options = {
        //variables que se van a conseguir de los parametros pasador por el url
        limit : req.query.limit || 10,
        page : req.query.page || 1,
        sort : req.query.sort || null,
        query : req.query.query || null,
        url: req.originalUrl.split("?")[0] || req.originalUrl,
      }
  
      const products = await productsService.getProducts(options)
  
      const response = {
        status: "success",
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.prevLink,
        nextLink: products.nextLink,
      }

      const cartSelected = await cartsService.getCartById(cartId)
      const cartSelectedId = cartSelected._id
      
      const cartResponse = {
        status: "success",
        payload: cartSelected.products,
      }
  
      res.render("cart", {
        hayProductos: response.payload.length > 0,
        hayProductosCart: cartResponse.payload.length > 0,
        response,
        cartResponse,
        style:"index.css",
        title: "Vista con listado de Productos y Paginacion",
        cartSelectedId
      })
    
  } catch (error) {
    throw new Error(`Hubo un error en cartViewController - views.router.js ${error}`)
  }}


// seria la url --> http://localhost:8080/
viewsRouter.get("/", productsController) //devuevle una vista de los productos existentes en la coleccion de productos muy basica

// seria la url --> http://localhost:8080/realtimeproducts
viewsRouter.get("/realtimeproducts", realTimeProductsController) //devuelve una vista que contiene 3 formularios (agregar/actualizar/eliminar productos de "products"), una lista de productos y una vista del carrito en la posicion [0] de "carts".

// seria la url --> http://localhost:8080/products
viewsRouter.get("/products", productsViewController) //--> Devuelve una vista de los productos en "products" con estilos y su numero de pagina con la paginacion posible mediante la url

// seria la url --> http://localhost:8080/carts/:cid
viewsRouter.get("/carts/:cid", cartViewController) //--> devuelve una vista de un carrito seleccionado mediante su id con estilos

export default viewsRouter
