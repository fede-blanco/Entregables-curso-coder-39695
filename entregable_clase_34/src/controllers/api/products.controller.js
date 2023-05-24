import { productsService } from "../../services/products.service.js";

//Funcion que Controla la acción de la url (GET) "/api/products"  --> version con pagination
export async function productsController(req, res) {
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
  res.json(response);

} catch (error) {
  throw new Error(`Hubo un problema con get products: ${error} --> products.controller.js + ${error}`);
}}

// //Controla la acción de la url "/api/products"  --> version anterior sin pagination
// async function productsController(req, res) {
//   try {
//     if (req.query.limit) {
//       // const productsAdquired = await productsManager.getProducts();
//       const productsAdquired = await productsService.getProducts();
//       const productsWhitLimit = productsAdquired.slice(0, req.query.limit);
//       res.json(productsWhitLimit);
//     } else {
//       // const productsAdquired = await productsManager.getProducts();
//       const productsAdquired = await productsService.getProducts();
//       res.json(productsAdquired);
//     }
//   } catch {
//     throw new Error(`Hubo un problema con get products`);
//   }
// }

//Funcion que Controla la acción de la url (GET) "/api/products/:pid" 
export async function productByIdController(req, res) {
  try {
    const idParam = req.params.pid;

    // const product = await productsManager.getProductById(idParam);
    const product = await productsService.getProductById(idParam)
    res.json(product);
  } catch (error) {
    throw new Error(`Error al buscar el producto con el id: ${idParam}  --> products.controller.js + ${error}`);
  }
}

////Funcion que Controla la acción de la url (POST) "/api/products" 
export async function addProductController(req, res) {
  const productToAdd = req.body;
  try {
    const addedProduct = await productsService.addProduct(productToAdd);
    res.status(201).json(addedProduct);
  } catch (error) {
    res.status(400).json({ msg: error.message });
    throw new Error(`Error en addProductController -- > products.controller.js + ${error}`)
  }
}

//////Funcion que Controla la acción de la url (PUT) "/api/products/:pid" 
export async function updateProductController(req, res) {
  try {
    console.log("productsController -- req.body -->", req.body);
    console.log("productsController -- req.params.pid -->", req.params.pid);
    const productToUpdate = req.body.prod;
    const productId = req.params.pid;
    // const updatedProduct = await productsManager.updateProduct(
    //   productId,
    //   productToUpdate
    // );
    const updatedProduct = await productsService.updateProduct(
      productId,
      productToUpdate
    );
    console.log("productsController -- updatedProduct -->", updatedProduct);
    res.json(updatedProduct);
  } catch (error) {
    throw new Error(`Error en updateProductController -- > products.controller.js + ${error}`);
  }
}

//Funcion que Controla la acción de la url (DELETE) "/api/products/:pid" 
export async function deleteProductController(req, res) {
  try {
    const prodToDeleteId = req.params.pid;
    // const arrayWhithoutProduct = await productsManager.deleteProduct(
    const arrayWhithoutProduct = await productsService.deleteProduct(
      prodToDeleteId
    );
    res.status(201).json(arrayWhithoutProduct)
  } catch (error) {
    throw new Error(`Error en deleteProductsController -- > products.controller.js + ${error}`);
  }
}