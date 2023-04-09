export function errorHandler(error, req, res, next) {
    switch (error.tipo) {
        case 'AUTH_ERROR':
            res.status(401)
            break
        case 'PERMITS_ERROR':
            res.status(403)
            break
        default:
            res.status(500)
    }
    console.log(' ******** comienza el log del error ********')
    console.log(error)
    console.log(' ********** fin del log del error **********')

    res.json({ errorMsg: error.message })
}
