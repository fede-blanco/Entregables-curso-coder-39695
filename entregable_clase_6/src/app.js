import express from "express";
import { ProductManager } from "./ProductManager.js";
const PORT = 8080;

const productManager = new ProductManager("src/database/products.json");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Permite enviar info desde la url

//Controla la acción de la url "/"
async function homeController(req, res) {
  console.log("hola desde GET HOME");
  res.send("Hola desde GET HOME");
}

//Controla la acción de la url "/products"
async function productsController(req, res) {
  //En caso de que haya algo en la propiedad query.limit recorta el array de acuerdo con ese limite
  if (req.query.limit) {
    console.log("Hola desde GET PRODUCTS ? LIMIT");
    console.log(req.query.limit);
    const productsAdquired = await productManager.getProducts();
    const productsWhitLimit = productsAdquired.slice(0, req.query.limit);
    res.json(productsWhitLimit);
  } else {
    console.log("Hola desde GET PRODUCTS");
    const productsAdquired = await productManager.getProducts();
    res.json(productsAdquired);
  }
}

//Controla la acción de la url "/products" con param :id
async function productByIdController(req, res) {
  console.log(`Hola desde ProductById -- id: ${req.params.id}`);
  const productAdquired = await productManager.getProductById(
    //Fue imprescindible parsear a número el id recibido por params para poder utilizarlo en el método getProductById, sino undefined
    parseInt(req.params.id)
  );
  res.json(productAdquired);
}

app.get("/", homeController);

app.get("/products", productsController);

app.get("/products/:id", productByIdController);

app.listen(PORT, () => {
  console.log("conectado...en el puerto 8080!!!");
});
