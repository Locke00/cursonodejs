console.log("socket");

const socket = io();

socket.on("movies", (data) => {
  
  data = data.map(
    (each) => `
      <div class="card" style="width: 18rem;">
        <img src="${each.poster}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${each.name}</h5>
        </div>
      </div>`
  ).join()
  console.log(data);
  document.querySelector("#movies").innerHTML = data
});

//socket.on("welcome",messaje=>console.log(messaje))
//socket.on("welcome", (messaje) => alert(messaje));
/*
socket.emit("new movie", {
  name: "batman",
  poster:
    "https://www.lavanguardia.com/files/og_thumbnail/uploads/2017/04/10/5fa3c6ca21373.jpeg",
  place: "showcase",
  price: 1,
  capacity: 200,
  date: new Date(),
});*/

socket.on("new success", (message) => alert(message));

document.querySelector("#newEvent").addEventListener("click", (event) => {
  event.preventDefault();
  const title = document.querySelector("#name").value;
  const poster = document.querySelector("#poster").value;
  const place = document.querySelector("#place").value;
  const price = document.querySelector("#price").value;
  const capacity = document.querySelector("#capacity").value;
  const date = document.querySelector("#date").value;

  const data = {};
  title && (data.name = title);
  if (poster) {
    data.poster = poster;
  }
  price && (data.price = price);
  if (capacity) {
    data.capacity = capacity;
  }
  place && (data.place = place);
  date && (data.date = date);
  console.log(data);
  socket.emit("new movie", data);
});
