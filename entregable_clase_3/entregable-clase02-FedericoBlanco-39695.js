class ProductManager {
  products
  constructor() {
    this.products = [];
  }

  getProducts() {
    return console.log(this.products);
  }

  getProductById(productId) {
    const searchedProduct = this.products.find(
      (product) => product.id === productId
    );
    if (!searchedProduct) {
      // throw new Error('Product not found')
      return console.error("Product Not Found");

    } else {
      console.log(searchedProduct);
    }
  }

  addProduct({title, description, price, thumbnail, code, stock, id}) {

    if (this.products.find((e) => e.code === code)) {
      // throw new Error('Error, El código está repetido')
      return console.error('Error, El código está repetido');
    }
    if (this.products.length === 0) {
      id = 1;
    } else {
      id = this.products.length + 1;
    }

    if(title === undefined || description === undefined || price === undefined || thumbnail === undefined || code === undefined || stock === undefined || id === undefined) {
      console.error("Uno de los campos no fue completado");
    } else {
      this.products.push(new Product({title, description, price, thumbnail, code, stock, id}));
      console.log(`Agregado el producto ID: ${id}`);
    }

  }
}

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



// ------------- PRUEBAS ---------------------

const pm = new ProductManager();
console.log(pm.getProducts());
pm.addProduct({
 title: "Producto prueba",
 description:  "Este es un producto de prueba",
 price: 200,
 thumbnail: "sin Imagen",
 code: "abc123",
 stock: 25
});
console.log(pm.getProducts());
pm.addProduct({
  title: "Otro Producto prueba",
  description: "Este es Otro producto de prueba",
  price: 500,
  thumbnail: "sin Imagen",
  code: "abc456",
  stock: 25
});
console.log(pm.getProducts());
pm.addProduct({
  title: "Otro Producto prueba",
  description: "Este es Otro producto de prueba",
  price: 500,
  thumbnail: "sin Imagen",
  code: "abc123",
  stock: 25
});
pm.addProduct({
  title: "Otro Producto prueba sin thumbnail",
  description: "Este es Otro producto de prueba",
  price: 500,
  code: "abc789",
  stock: 25
});
console.log(pm.getProducts());
pm.getProductById(1);
pm.getProductById(2);
pm.getProductById(5);
