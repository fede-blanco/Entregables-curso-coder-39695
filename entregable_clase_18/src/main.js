import express from "express"
import __dirname from "./utils.js"
import routerProducts from "./routes/routerProducts.js"
import routerCarts from "./routes/routerCarts.js"
import viewsRouter from "./routes/views.router.js"
import { productManager } from "./managers/ProductManager.js"
import { productsService } from "./services/products.service.js"
//importamos el motor de planteillas de handlebars
import { engine } from "express-handlebars"
// Importamos el servidor de socket
import { Server as SocketIoServer } from "socket.io"
import { PORT } from "./config/server.js"
import { MONGODB_CNX_STR_LOCAL, MONGODB_CNX_STR_REMOTE } from "./config/mongodb.js"
import mongoose from "mongoose"
import { cartsService } from "./services/carts.service.js"
import { ObjectId } from "mongoose"

//creamos el servidos express en y lo almacenamos en la variable app
const app = express()
// await mongoose.connect(MONGODB_CNX_STR_LOCAL)
await mongoose.connect(MONGODB_CNX_STR_REMOTE)

// Para recibir json en el cuerpo de la petición y recibir datos por url
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Con app.engine decido que motor de plantillas voy a utilizar y en este caso elegimos "handlebars"
app.engine("handlebars", engine())
// Se le indica de que carpeta va a sacar las vistas a renderizar
app.set("views", `./views`)
// Tambien le indicamos el engine por defecto que utilizará, en caso de que un archivo no tenga extensión.
// Osea que si le indicamos "users" buscara un archivo "users.handlebars"
app.set("view engine", "handlebars")


//Es importante utilizar esta modalidad de rutear el static para poder poner JS y CSS en las plantillas
app.use(express.static(__dirname+'/public'))

// implementamos los routers a ambas rutas
app.use("/api/products", routerProducts)
app.use("/api/carts", routerCarts)
app.use("/", viewsRouter)

// nos conectamos al puerto de entrada y salida
const puerto = PORT
const ConnectedServer = app.listen(puerto, () => {
  console.log(`Conectado en el puerto ${puerto}`)
})

//creamos el servidor de socket.io
//Para construirse debe apoyarse en un servidor existente (un server HTTP)
const io = new SocketIoServer(ConnectedServer)

io.on("connection", (socket) => {
  console.log("Cliente Conectado con socket.io!!")

  socket.on("addProduct", async (prod) => {
    //En el back agrego un producto al json
    await productsService.addProduct(prod)
    //Obtengo la lista de productos proveniente de json actualizada
    const prodListItems = await productsService.getProducts()
    //envio el mensaje con los productos al front
    socket.emit("updateProductsList",prodListItems )
  })
  
  socket.on("updateProduct", async (prodId, prod) => {
    //En el back modifico un producto al json
    await productsService.updateProduct(prodId, prod)
    //Obtengo la lista de productos proveniente de la base de datos actualizada
    const data = await productsService.getProducts(prod)
    const prodListItems = data.docs;
    //envio el mensaje con los productos al front
    socket.emit("updateProductsList",prodListItems )   
  })
  
  socket.on("deleteProduct", async (productId) => {
    //En el back elimino un producto al json
    await productsService.deleteProduct(productId);
    //Obtengo la lista de productos proveniente de json actualizada
    const prodListItems = await productsService.getProducts()
    //envio el mensaje con los productos al front
    socket.emit("updateProductsList",prodListItems )   
  })

  socket.on("deleteProductFromCart", async (productId) => {

    //traingo el ObjectId del carrito
    const carts = await cartsService.getCarts()
    const cartSelected = carts[0]
    const cartSelectedId = cartSelected._id

    //Le saco las comillas de los extremos
    const prodSinComillas = productId.replace(/`/g, '')

    //Genero un ObjectId de mongoose con este id
    const productObjId = new mongoose.Types.ObjectId(prodSinComillas);

    await cartsService.deleteFullProductFromCart(cartSelectedId, productObjId)

    //Obtengo la lista de productos en el carrito
    const cartUpdated = await cartsService.getCartById(cartSelectedId)

    const cartResponse = {
      status: "success",
      payload: cartUpdated.products,
    }
     //envio el mensaje con los productos al front
     socket.emit("updateCartList",cartResponse )  
  })

  socket.on("addProductToCart", async (productId) => {
    // En el back agrego el producto al carrito
    const carts = await cartsService.getCarts()
    const cartSelected = carts[0]
    const cartSelectedId = cartSelected._id
    
    const prodSinComillas = productId.replace(/`/g, '')

    const productObjId = new mongoose.Types.ObjectId(prodSinComillas);

    await cartsService.addProductToCart(cartSelectedId,productObjId)

    const cartUpdated = await cartsService.getCartById(cartSelectedId)

    const cartResponse = {
      status: "success",
      payload: cartUpdated.products,
    }

    socket.emit("updateCartList", cartResponse)

  })
})