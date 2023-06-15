import { AddProductError } from "../errors/AddProductError.js"
import { AuthError } from "../errors/AuthError.js"
import { PermitsError } from "../errors/PermitsError.js"

export function errorHandler(error, req, res, next) {

    // switch (error.tipo) {
    //     case 'AUTH_ERROR':
    //         res.status(401)
    //         break
    //     case 'PERMITS_ERROR':
    //         res.status(403)
    //         break
    //         case 'ADD_PROD_ERROR':
    //         res.status(404)
    //     default:
    //         res.status(500)
    // }

    if (error instanceof AuthError) {
        res.status(401)
    } else if (error instanceof PermitsError) {
        res.status(403)
    } else if (error instanceof AddProductError){
        res.status(404)
    } else {
        res.status(500)
    }


    // console.log(' ******** comienza el log del error ********')
    // console.log(error)
    // console.log(' ********** fin del log del error **********')

    res.json({ status: "error", errorMsg: error.message ?? 'Error interno: causa desconocida' })
}
