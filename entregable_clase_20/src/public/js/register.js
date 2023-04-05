const registerForm = document.getElementById("register_form")

// "instanceof" es un operador de javascript que me dice si una variable tiene un valor que es "instancia" de alguna clase en particular. En este caso queremos saber si esto que encontro es una instancia de HTMLFormElement.
if (registerForm instanceof HTMLFormElement) {
  registerForm.addEventListener("submit", (e) => {
    //prevenimos el comportamiento por defecto del submit de los formularios q es recargar la pagina
    e.preventDefault()

    console.log("EventListener del Submit")
    console.log("linea 10 register.js");
    console.log(registerForm);
    const data = new FormData(registerForm)
    console.log("linea 13 register.js");
    console.log(data);
    const obj = {}

    //Porcada objeto /key/value que se crea dentro de la instancia de "FormData" se agrega una propiedad con el nombre de la "key" y el valor del "value" obtenido
    data.forEach((value, key) => (obj[key] = value))

    console.log("linea 20 register.js");
    console.log(obj);

    // Hago la peticion fetch "post" con los datos del formulario a la ruta /api/usuarios
    fetch("/api/sessions/register", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "content-type": "application/json",
      },
    })
    .then(result => {
      if (result.status === 200) {
          window.location.replace('/login')
      }
  })
  })
}
