const loginForm = document.getElementById("login-form")

if (loginForm instanceof HTMLFormElement) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log("linea 6 login.js");
        console.log(loginForm);
        //Forma rapida de crear un objeto con los datos clave/valor que se obtienen de un formulario. //| improtante que los inputs tengan atributo "name" que es el que utilizará para darle la clave a la propiedad del objeto creado
        const data = new FormData(loginForm)
        console.log("linea 9 login.js");
        console.log(data);
        const obj = {}
        data.forEach((value, key) => (obj[key] = value))
        console.log("linea 13 login.js");
        console.log(obj);
        fetch('/api/sessions/login', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                if (result.status === 200) {
                    window.location.replace('/products')
                }
            })
    })
}

