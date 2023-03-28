//por defecto io toma como parametro la misma ruta que la pagina que esta cargando 
// const socket = io("http://localhost:8080/"); 
const socket = io(); 


document.querySelector("#btn-add").addEventListener("click", e => {

  // ----- VALIDACIONES
  let actualStatus = false;
  if (document.querySelector("#status-add").checked) {
    actualStatus = true;
  }
  let thumbnails = [];
  if (!document.querySelector("#thumbnails-add").value === "") {
    thumbnails = thumbnails.push(document.querySelector("#thumbnails-add").value);
  }

  //---Objeto obtenido del formulario
  const prod = {
    title: document.querySelector("#title-add").value ,
    description: document.querySelector("#description-add").value,
    price: parseFloat(document.querySelector("#price-add").value),
    thumbnails: thumbnails,
    code: document.querySelector("#code-add").value,
    stock: parseInt(document.querySelector("#stock-add").value),
    category: document.querySelector("#category-add").value,
    status: actualStatus,
  }

  //se resetean los inputs del formulario
  document.querySelector("#title-add").value = ""
  document.querySelector("#description-add").value = ""
  document.querySelector("#price-add").value = ""
  document.querySelector("#code-add").value = ""
  document.querySelector("#stock-add").value = ""
  document.querySelector("#category-add").value = ""

  // ---se envia el producto obtenido edel formulario 
  socket.emit("addProduct", prod)
})


document.querySelector("#btn-update").addEventListener("click", e => {
  
  //validamos que si no se ingresa un id de algun producto para identificarlo te alerta
  if (!document.querySelector("#id-update").value) {
    alert("No se ingreso ningun id de producto a modificar")
  } else {

  // ----- VALIDACIONES
  let actualStatus = false;
  if (document.querySelector("#status-update").checked) {
    actualStatus = true;
  }

  //inicializamos el producto que se obtendrá del formulario para luego ir completándolo dinámicamente
  let prod = {}

  if (document.querySelector("#id-update").value){
    prod = { ...prod, id:document.querySelector("#id-update").value}
  }
  if (document.querySelector("#title-update").value){
    prod = { ...prod, title:document.querySelector("#title-update").value}
  }
  if (document.querySelector("#description-update").value){
    prod = { ...prod, description:document.querySelector("#description-update").value}
  }
  if (document.querySelector("#price-update").value){
    prod = { ...prod, price:document.querySelector("#price-update").value}
  }
  if (document.querySelector("#thumbnails-update").value){
    prod = { ...prod, thumbnails:document.querySelector("#thumbnails-update").value}
  }
  if (document.querySelector("#code-update").value){
    prod = { ...prod, code:document.querySelector("#code-update").value}
  }
  if (document.querySelector("#stock-update").value){
    prod = { ...prod, stock:document.querySelector("#stock-update").value}
  }
  if (document.querySelector("#category-update").value){
    prod = { ...prod, category:document.querySelector("#category-update").value}
  }
  if (document.querySelector("#status-update").checked){
    prod = { ...prod, status: actualStatus}
  }
  
  //se resetean los inputs del formulario
  document.querySelector("#id-update").value = ""
  document.querySelector("#title-update").value = ""
  document.querySelector("#description-update").value = ""
  document.querySelector("#price-update").value = ""
  document.querySelector("#thumbnails-update").value = ""
  document.querySelector("#code-update").value = ""
  document.querySelector("#stock-update").value = ""
  document.querySelector("#category-update").value = ""

  // ---se envia el producto obtenido edel formulario 
  socket.emit("updateProduct", prod.id, prod)

  
  }



})

document.querySelector("#btn-delete").addEventListener("click", e => {
    //validamos que si no se ingresa un id de algun producto para identificarlo te alerta
    if (!document.querySelector("#id-delete").value) {
      alert("ingresar el id de un producto existente para Eliminarlo")
    } else {
      const productId = document.querySelector("#id-delete").value;
      socket.emit ("deleteProduct", productId )
      document.querySelector("#id-delete").value = ""
    }
} )

socket.on("updateProductsList", (prodListItems) => {
  const productList = document.getElementById("product-list");
  
  // Se crea una variable donde se ira guardando el código HTML de la vista de la lista de los productos
  let htmlList = ""

  // Por cada producto se crea un item y se agrega a la lista
  prodListItems.forEach(product => {
    const item = `<li id=${product.id}><strong class="prod-title">${product.title}</strong>
    <br />
    <strong>Price:</strong> $ ${product.price}
    <br />
    <strong>Description</strong>:
   ${product.description}
    <br />
    <strong>Id</strong>:
   ${product.id}</li>`;
    htmlList = htmlList+item;
  });

  // Se agrega toda la vista de la lista de los productos al innerHTML
  productList.innerHTML = htmlList;

})