document.querySelector("#signout").addEventListener("click", async () => {
  try {
    const token = localStorage.getItem("token"); // al token lo obtengo del localStorage
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json", token },  // envio el token en el header
    };
    let response = await fetch("/api/sessions/signout", opts);  
    response = await response.json();  // tengo q transformarla para poder usarla
    if (response.statusCode === 200) { // si tuvo exito el signout
      alert(response.message)
      localStorage.removeItem("token");  // le borro el elemento token al localStorage
      location.replace("/");
    }
  } catch (error) {
    console.log(error);
  }
});
