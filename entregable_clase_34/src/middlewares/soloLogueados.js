
import { PermitsError } from '../errors/PermitsError.js'

export function soloLogueadosApi(req, res, next) {
    // acá uso el atajo que me provee passport para ver
    // si hay una sesion inicializada por un usuario
    if (!req.user) {
        //     console.log('peticion de un usuario sin autenticarse, se lanza error')
        return next(new PermitsError())
    }
    // console.log('peticion de un usuario autenticado! continua el flujo normal del caso de uso')
    next()
}

export function soloLogueadosView(req, res, next) {
    // acá uso el atajo que me provee passport para ver
    // si hay una sesion inicializada por un usuario
    if (!req.user) {
        // console.log('peticion de un usuario sin autenticarse, se redirige a la pagina de login')
        return res.redirect('/login')
    }
    // console.log('peticion de un usuario autenticado! se redirige a la pagina de inicio')
    next()
}


//funcion de primer orden (funcion que devuelve un middleware, un callback) que verifica si el rol es el mismo y permite seguir o da error
export function RoleAuth(role) {
   return (req, res, next) => {
      console.log("soloLogueados.js -- req.user.rol -->", req.user.rol);
      console.log("soloLogueados.js --  role -->", role);
      if (req.user?.rol === role) return next()
      return next(new PermitsError(`solo disponible para rol '${role}'`))
  }
}
