function substract() {
  let counter = 0;
  for (let i = 0; i < 5e5; i++) {
    counter--;
  }
  return counter;
}

process.on("message", () => {
  const result = substract();
  console.log("child process id from substract: " + process.pid);
  process.send(result);
});
