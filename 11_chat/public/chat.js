const socket = io();

socket.on("messages", (messages) => {
  //console.log(messages);
});

const user = {}

Swal.fire({
  title: "Type your nickname",
  input: "text",
  inputValidator: (nickname) => !nickname && "Type your nickname", // el ok no me saca el alerta hasta tanto lo q ingrese sea distinto de nulo
  allowOutsideClick: false,
}).then(obj => {               // este alerta devuelve una promesa. no olvidar q las promesas q manejan con async-await, o try/catch
                // obj: es un objeto grande
  user.name = obj.value     //aqui se va a guardar lo q el usuario ingresó           
  document.querySelector("#name").innerHTML = obj.value
  socket.emit("user",user)
}) 

const newChat = document.querySelector("#text")
newChat.addEventListener("keyup", event => {       //xq cada vez q el usuario presione la tecla enter se tiene q enviar un msg
  if(event.key === "Enter"){
    //event.preventDefault();         //lo comento xq en realidad no era necesario

    socket.emit("new chat",{ name: user.name, message: newChat.value })  //44:12 
    newChat.value = ""
  }

})

socket.on("all",data=>{
  //data es un arreglo. le tengo q pasar el contenido de sus elementos, y pasarlo a codigo html
  //entonces le agrego codigo html a todos sus elementos y los uno con join()
  data = data.map(each=>`<p><span class="fw-bold">${each.name}: </span>${each.message}</p>`).join("")


  document.querySelector("#chats").innerHTML = data
})
