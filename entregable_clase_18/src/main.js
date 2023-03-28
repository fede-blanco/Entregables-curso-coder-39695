import express from "express"
import __dirname from "./utils.js"
import routerProducts from "./routes/routerProducts.js"
import routerCarts from "./routes/routerCarts.js"
import viewsRouter from "./routes/views.router.js"
import { productsManager } from "./managers/ProductManager.js"
//importamos el motor de planteillas de handlebars
import { engine } from "express-handlebars"
// Importamos el servidor de socket
import { Server as SocketIoServer } from "socket.io"

//creamos el servidos express en y lo almacenamos en la variable app
const app = express()

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
const puerto = 8080
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
    await productsManager.addProduct(prod)
    //Obtengo la lista de productos proveniente de json actualizada
    const prodListItems = await productsManager.getProducts()
    //envio el mensaje con los productos al front
    socket.emit("updateProductsList",prodListItems )
  })
  
  socket.on("updateProduct", async (prodId, prod) => {
    //En el back modifico un producto al json
    await productsManager.updateProduct(prodId, prod)
    //Obtengo la lista de productos proveniente de json actualizada
    const prodListItems = await productsManager.getProducts()
    //envio el mensaje con los productos al front
    socket.emit("updateProductsList",prodListItems )   
  })
  
  socket.on("deleteProduct", async (productId) => {
    //En el back elimino un producto al json
    await productsManager.deleteProduct(productId);
    //Obtengo la lista de productos proveniente de json actualizada
    const prodListItems = await productsManager.getProducts()
    //envio el mensaje con los productos al front
    socket.emit("updateProductsList",prodListItems )   
  })


})
