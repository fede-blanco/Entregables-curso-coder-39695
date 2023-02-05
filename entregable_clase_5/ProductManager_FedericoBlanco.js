const fs = require('fs');


//clase Que instancia objetos producto
class Product {
  title
  description
  price
  thumbnail
  code
  stock
  id

  constructor({title = undefined, description = undefined, price = undefined, thumbnail = undefined , code = undefined, stock = undefined , id}) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = id
    // return this;
  }
}


//Clase ProductManager que maneja Los objetos producto
class ProductManager {

  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async inicializarPersistencia() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify([], null, 2))
    } catch (error) {
      throw new Error(`Error al inicializar: ${this.path}`)
    }
  }
  
  async actualizarArrayDeProductos() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      throw new Error(`Error al actualizar el array de productos: ${error}`)
    }
  }
  
  async addProduct({title, description, price, thumbnail, code, stock, id}) {

    //valida que el codigo no esté repetido
    if (this.products.find((e) => e.code === code)) {
      throw new Error('Error, El código del producto ingresado está repetido')
      // return console.error('Error, El código está repetido');
    }

    //if que verifica si el array esta vacío y le da el id = 1 al producto o le da el valor del id dependiendo de la longitud del array
    if (this.products.length === 0) {
      id = 1;
    } else {
      id = this.products.length + 1;
    }
    
    //valida que se hayan ingresado todos los datos del producto para funcionar
    if(title === undefined || description === undefined || price === undefined || thumbnail === undefined || code === undefined || stock === undefined || id === undefined) {
      throw new Error('Error, falta alguna de las propiedades del producto')
      // console.error("Uno de los campos no fue completado");
    } else {
    try {
      await this.actualizarArrayDeProductos();
      this.products.push(new Product({title, description, price, thumbnail, code, stock, id}));
      await fs.promises.writeFile(this.path,  JSON.stringify(this.products, null , 2))
      console.log(`Agregado el producto ID: ${id}`);
    } catch (error) {
      throw new Error(`Error al realizar addProducts --> Producto: ${title} id: ${id}`)
    }
  }}


  async deleteProduct(productId){
    try {
      
      await this.actualizarArrayDeProductos();
      // //se verifica si hay alguna coincidencia con el id pasado por parámetro
      const searchedProduct = this.products.find((product) => product.id === productId);

      if(!searchedProduct) {
        throw new Error(`Error: the product whith the id:${productId} do not exist in the array to delete it`)
      }
      
      const newArray = this.products.splice(this.products.indexOf(searchedProduct) - 1,1);
      this.products = newArray;

      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
      console.log(`eliminado el producto ID: ${productId}`);
      
    } catch (error) {
      throw new Error(`Error: the product whith the id:${productId} do not exist in the array to delete it`)
    }
  }




  async getProducts() {
    try {
      if(this.products.length === 0){
        await this.inicializarPersistencia();
        await this.actualizarArrayDeProductos();
        return this.products;
      } else {
        await this.actualizarArrayDeProductos();
        return this.products;
      }
    } catch (error) {
      throw new Error(`Error al realizar getProducts: ${error}`)
    }
  }

  async getProductById(productId) {
    try {
      // se actualiza el array de productos con la info del archivo
      await this.actualizarArrayDeProductos();
      // //se verifica si hay alguna coincidencia con el id pasado por parámetro
      const searchedProduct = this.products.find((product) => product.id === productId);
      if(!searchedProduct) {
        throw new Error(`Error: the product whith the id:${productId} do not exist in the array`)
      }
      return searchedProduct;
    } catch (error) {
      throw new Error(`Error: the product whith the id:${productId} do not exist in the array!`)
    }
  }


  async updateProduct(productId, newProperties) {
    try {
      // se actualiza el array de productos con la info del archivo
      await this.actualizarArrayDeProductos();
      // //se verifica si hay alguna coincidencia con el id pasado por parámetro
      const searchedProduct = this.products.find((product) => product.id === productId);

      //se busca el indice del producto a modificar
      let ProductPosition = this.products.indexOf(searchedProduct)

      if(!searchedProduct) {
        throw new Error(`Error: the product whith de id:${productId} do not exist in the array`)
      }

      
      //reemplaza valores del searchedProduct si los encuentra en "newProperties" (producto  a modificar)
      if(newProperties.title) {
        searchedProduct.title = newProperties.title;
      }
      if(newProperties.description) {
        searchedProduct.description = newProperties.description;
      }
      if(newProperties.price) {
        searchedProduct.price = newProperties.price;
      }
      if(newProperties.thumbnail) {
        searchedProduct.thumbnail = newProperties.thumbnail;
      }
      if(newProperties.code) {
        searchedProduct.code = newProperties.code;
      }
      if(newProperties.stock) {
        searchedProduct.stock = newProperties.stock;
      }

      await fs.promises.writeFile(this.path,  JSON.stringify(this.products, null , 2))
      console.log(`modificado el producto ID: ${productId}`);
    } catch (error) {
      throw new Error(`Error: the product whith de id:${productId} do not exist in the array!!!`)
    }
  }

}



// ----------------------------------------------------------------------------------------------------
// --------------- Función que ejecuta las pruebas de una en una al correr el archivo -----------------
// ----------------------------------------------------------------------------------------------------

async function main() {

  //Se instancia ProductManager()
  const pm = new ProductManager('./products.json'); //La carpeta ya debe estar creada para crearle el archivo en el interior

  //se llama getProducts por 1ra vez y se verifica que retorna
  const getProducts1 = await pm.getProducts();
  console.log(" ---> 1ra vez que llamamos getProducts \n Debe retornar un array vacio --> \n"
  , getProducts1);
  
  //se agrega un producto de prueba
  await pm.addProduct({
    title: "Producto prueba",
    description:  "Este es un producto de prueba",
    price: 200,
    thumbnail: "sin Imagen",
    code: "abc123",
    stock: 25
  })
  
  
  //se llama getProducts por 2da vez y se verifica que retorna
  const getProducts2 = await pm.getProducts();
  console.log(" ---> 2da vez que llamamos getProducts \n Debe retornar el array con el objeto guardado en el archivo --> \n"
  , getProducts2);
  
  //se agrega otro producto de prueba
  await pm.addProduct({
    title: "Otro Producto prueba",
    description: "Este es Otro producto de prueba",
    price: 500,
    thumbnail: "sin Imagen",
    code: "abc456",
    stock: 25
  });

  //se llama getProducts por 3ra vez y se verifica que retorna
  const getProducts3 = await pm.getProducts();
  console.log(" ---> 3ra vez que llamamos getProducts \n Debe retornar los 2 objetos guardados en el archivo --> \n"
  , getProducts3);

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
  const newProperties = {title:"Producto de Prueba Updated!!!", price: 750, stock: 20}
  const updateProduct1 = await pm.updateProduct(1, newProperties);

  //se llama getProducts por 4ta vez y se verifica si se retorna el array con el producto modificado
  const getProducts4 = await pm.getProducts();
  console.log(" ---> 4ta vez que llamamos getProducts \n Debe retornar el array con el objeto del id indicado con sus propiedades modificadas --> \n"
  , getProducts4);
  
  
  //Se llama a deleteProduct para eliminar uno de los productos guardados en el array dentro del archivo .json
  const deleteProduct1 = await pm.deleteProduct(2);
  // console.log(deleteProduct1);
  
  
  //se llama getProducts por 5ta vez y se verifica si se retorna el array con el producto modificado
  const getProducts5 = await pm.getProducts();
  console.log(" ---> 5ta vez que llamamos getProducts \n Debe retornar el array luego de haberse eliminado el objeto indicado --> \n"
  , getProducts5);


}

main();