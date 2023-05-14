import { Router } from "express"
import { cartViewController, chatViewController, loginViewController, productsViewController, profileViewController, realTimeProductsController, registerViewController } from "../controllers/web/views.controller.js"
import { RoleAuth, soloLogueadosView } from "../middlewares/soloLogueados.js"
import { autenticacionJwtAlreadyLogged, autenticacionJwtView, autenticacionUserPass } from "../middlewares/passport.js"

const viewsRouter = Router()


// ****************   Middlewares   *************************
// const publicAccess = (req, res, next) => {
//   if (req.session.user) return res.redirect('/')
//   next()
// }

// const privateAccess = (req, res, next) => {
//   if (!req.session.user) return res.redirect('/login')
//   next()
// }
// ******************************************************


// // seria la url --> http://localhost:8080/
// viewsRouter.get("/", privateAccess, productsController) //devuevle una vista de los productos existentes en la coleccion de productos muy basica

// seria la url --> http://localhost:8080/realtimeproducts
viewsRouter.get("/realtimeproducts",autenticacionJwtView, RoleAuth("admin"),  realTimeProductsController) //devuelve una vista que contiene 3 formularios (agregar/actualizar/eliminar productos de "products"), una lista de productos y una vista del carrito en la posicion [0] de "carts".

// seria la url --> http://localhost:8080/products
viewsRouter.get("/products", autenticacionJwtView, productsViewController) //--> Devuelve una vista de los productos en "products" con estilos y su numero de pagina con la paginacion posible mediante la url

// seria la url --> http://localhost:8080/carts/:cid
viewsRouter.get("/carts/:cid", cartViewController) //--> devuelve una vista de un carrito seleccionado mediante su id con estilos


//-------  Rutas relacionadas al "chat" ---------
viewsRouter.get("/chat", autenticacionJwtView,  chatViewController)


// -------   ruta "currento" con info del usuario logueado ----
viewsRouter.get("/current", autenticacionJwtView, profileViewController)



//-------  Rutas relacionadas al "registro" y al "login" ---------

viewsRouter.get('/register', autenticacionJwtAlreadyLogged, registerViewController)

viewsRouter.get('/login', autenticacionJwtAlreadyLogged,  loginViewController)

// viewsRouter.get('/', soloLogueadosView, productsViewController)
viewsRouter.get('/', autenticacionJwtView, productsViewController)

//----------------------------------------------//
viewsRouter.get('*', (req, res) => {
  res.redirect('/login');
})


export default viewsRouter
