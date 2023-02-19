import express from "express";

import routerProducts from "./routes/routerProducts.js";
import routerCarts from "./routes/routerCarts.js";

//creamos el servidos express en y lo almacenamos en la variable app
const app = express();

// Para recibir json en el cuerpo de la petición y recibir datos por url
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// implementamos los routers a ambas rutas
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

// nos conectamos al puerto de entrada y salida
const puerto = 8080;
app.listen(puerto, () => {
  console.log(`Conectado en el puerto ${puerto}`);
});
