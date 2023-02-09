import ProductManager from "./ProductManager.js";

// ----------------------------------------------------------------------------------------------------
// --------------- Función que ejecuta las pruebas de una en una al correr el archivo -----------------
// ----------------------------------------------------------------------------------------------------

async function main() {
  //Se instancia ProductManager()
  const pm = new ProductManager("database/products.json"); //La carpeta ya debe estar creada para crearle el archivo en el interior

  //se llama getProducts por 1ra vez y se verifica que retorna
  const getProducts1 = await pm.getProducts();
  console.log(
    " ---> 1ra vez que llamamos getProducts \n Debe retornar un array vacio --> \n",
    getProducts1
  );

  //se agrega un producto de prueba
  await pm.addProduct({
    title: "Producto prueba 1",
    description: "Este es un producto de prueba",
    price: 200,
    thumbnail: "sin Imagen",
    code: "abc123",
    stock: 25,
  });

  //se llama getProducts por 2da vez y se verifica que retorna
  const getProducts2 = await pm.getProducts();
  console.log(
    " ---> 2da vez que llamamos getProducts \n Debe retornar el array con el objeto guardado en el archivo --> \n",
    getProducts2
  );

  //se agrega otro producto de prueba
  await pm.addProduct({
    title: "Otro Producto prueba 2",
    description: "Este es Otro producto de prueba",
    price: 500,
    thumbnail: "sin Imagen",
    code: "abc456",
    stock: 25,
  });

  //se llama getProducts por 3ra vez y se verifica que retorna
  const getProducts3 = await pm.getProducts();
  console.log(
    " ---> 3ra vez que llamamos getProducts \n Debe retornar los 2 objetos guardados en el archivo --> \n",
    getProducts3
  );

  //se llama a getProductsById() y se verifica que retorna con ambos ids existentes
  // const getProductById1 = await pm.getProductById(1);
  // console.log(getProductById1);
  // const getProductById2 = await pm.getProductById(2);
  // console.log(getProductById2);

  //se llama a getProductsById() y se verifica que retorna con el id =10 (que no existe)
  // const getProductById3 = await pm.getProductById(10);
  // console.log(getProductById3);

  // //se intenta agregar otro producto de prueba con el "code" repetido
  // await pm.addProduct({
  //   title: "Otro Producto prueba",
  //   description: "Este es Otro producto de prueba",
  //   price: 500,
  //   thumbnail: "sin Imagen",
  //   code: "abc123",
  //   stock: 25
  // });

  // // Se intenta agregar producto de prueba pero sin la propiedad "thumbnail"
  // await pm.addProduct({
  //   title: "Otro Producto prueba sin thumbnail",
  //   description: "Este es Otro producto de prueba",
  //   price: 500,
  //   code: "abc789",
  //   stock: 25
  // });

  //Se llama a updateProduct() y se le spasa un id y un objeto con propiedades para modificarle a dicho objeto del array
  const newProperties = {
    title: "Producto de Prueba Updated!!!",
    price: 750,
    stock: 20,
  };
  const updateProduct1 = await pm.updateProduct(1, newProperties);

  //se llama getProducts por 4ta vez y se verifica si se retorna el array con el producto modificado
  const getProducts4 = await pm.getProducts();
  console.log(
    " ---> 4ta vez que llamamos getProducts \n Debe retornar el array con el objeto del id indicado con sus propiedades modificadas --> \n",
    getProducts4
  );

  //Se llama a deleteProduct para eliminar uno de los productos guardados en el array dentro del archivo .json
  //const deleteProduct1 = await pm.deleteProduct(2);
  // console.log(deleteProduct1);

  //se llama getProducts por 5ta vez y se verifica si se retorna el array con el producto modificado
  const getProducts5 = await pm.getProducts();
  console.log(
    " ---> 5ta vez que llamamos getProducts \n Debe retornar el array luego de haberse eliminado el objeto indicado --> \n",
    getProducts5
  );

  // Se agregan 8 productos mas
}

main();
