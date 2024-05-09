function sum() {
  let counter = 0;
  for (let i = 0; i < 5e5; i++) {
    counter++;
  }
  return counter;
}

process.on("message", () => {    // cuando es llamado del padre, y recibe el parametro "message"
  console.log("child process id: from sum " + process.pid);
  console.log("FFF");
  const result = sum();
  console.log("HHH");
  process.send(result);   //le devuelve al proceso padre(al q lo llama) la sumatoria
});
    