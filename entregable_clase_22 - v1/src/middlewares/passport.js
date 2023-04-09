import passport from 'passport'
import { AuthError } from '../errors/AuthError.js'

// Importamos la estrategia de github desde passport-github2
import { Strategy as GithubStrategy } from 'passport-github2'
// Importamos la estrategia LocalStrategy desde passport-local
import { Strategy as LocalStrategy} from 'passport-local'
//Para mas orden y porque son datos sensibles, modularizamos y traemos las variables con los datos para la estrategia de github desde un archivo auth.config.js
import { githubCallbackUrl, githubClientSecret, githubClienteId } from '../config/auth.config.js'
import { User } from '../models/User.js'
import { isValidHash } from '../utils.js'
import { usersService } from '../services/users.service.js'


// Estrategia de login local
passport.use('local', new LocalStrategy({ usernameField: 'email', }, async ( username, password, done) => {
  try {
    // esto es lo que estaba en el controller de login
    const user = await usersService.getUserByEmail(username)
    if (!user){
      return done(new AuthError())
    }
    if (!isValidHash(password, user.password)) {
      return done(new AuthError())
    }

    //Si el email y la pass coinciden con los indicados se crea una propiedad con valor "admin", sino se crea con valor "user"
    if(username === "adminCoder@coder.com" && password === "adminCod3r123"){
      user["rol"] = "admin"
    } else {
      user["rol"] = "user"
    }
    delete user.password
    done(null, user)
  } catch (error) {
    console.log("************** Linea 43 passport.js ************");
    done(error, null)
  }
}))

//Estrategia de login mediante github
passport.use('github', new GithubStrategy({
    clientID: githubClienteId,
    clientSecret: githubClientSecret,
    callbackURL: githubCallbackUrl
}, async (accessToken, refreshToken, profile, done) => {
  //devuelve el perfil de github que tiene mucha info, la cual podamos usar (tanta info como datos tenga cargados el ususario de github)

    let user
    try {
        user = await usersService.getUserByEmail(profile._json.email)

       //Si el email y la pass coinciden con los indicados se crea una propiedad con valor "admin", sino se crea con valor "user"
       if(user["email"] === "adminCoder@coder.com"){
         user["rol"] = "admin"
       } else {
         user["rol"] = "user"
       }

    } catch (error) {
        // @ts-ignore
        user = new User({
            first_name: profile._json.name.split(" ")[0],
            last_name: profile._json.name.split(" ")[1],
            email: profile._json.email,
            password: null,
            age: null
        })
        await usersService.addUser(user)
         //Si el email y la pass coinciden con los indicados se crea una propiedad con valor "admin", sino se crea con valor "user"
         if(user["email"] === "adminCoder@coder.com"){
          user["rol"] = "admin"
        } else {
          user["rol"] = "user"
        }
    }
    done(null, user)
}))



// estos son para cargar en express como middlewares a nivel aplicacion
export const passportInitialize = passport.initialize()
export const passportSession = passport.session()


// esto lo tengo que agregar para que funcione passport! copiar y pegar, nada mas.
passport.serializeUser((user, next) => { 
  next(null, user) 
})
passport.deserializeUser((user, next) => { 
  next(null, user) 
})


// estos son para cargar como middlewares antes de los controladores correspondientes
//Utilizan el passport.autenticate con la estrategia de github
// export const authenticateLocal = 
export const autenticacionUserPass = passport.authenticate('local', { 
  failWithError: true,
  //  successRedirect: "/products" //--> no lo pongo por este medio porque lo hago en login.js
   })
export const autenticacionPorGithub = passport.authenticate('github', {
   failWithError: true,
   scope: ['user:email'] })
export const antenticacionPorGithub_CB = passport.authenticate('github', { failWithError: true })
