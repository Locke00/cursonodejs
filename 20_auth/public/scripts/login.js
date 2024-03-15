const selector = document.querySelector("#login");

selector.addEventListener("click", async () => {  //cada click en el boton va a generar ejecutar el cb
  
  try {
    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    };
    console.log(data);
    const opts = {
      method: "POST", //otras alternativas: PUT, DELETE, etc
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/sessions/login", opts); //para q consuma los datos de ese option
    response = await response.json()  // lo paso a json para q la respuesta se pueda interpretar bien
    //console.log(response);  //response, en caso de exito tendria el valor: // lo comento xq la consola es solo para nosotros
    //{ message: "Logged in"
    //  session: cookie: {originalMaxAge: null, expires: null, httpOnly: true, path: '/'}
    //  email: "franco3@gmail.com"
    //  statusCode: 200    }  
    alert(response.message)
    response.session && location.replace("/")   //si existe la sesion, q me redirija hacia la pagina de inicio
  } catch (error) {
    alert(error.message);
  }
});
