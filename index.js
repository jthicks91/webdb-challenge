const express = require("express");
const server = express();
server.use(express.json());

function logger(req, res, next) {
  const { path } = req;
  const timeStamp = Date.now();
  const log = { path, timeStamp };
  console.log(`${req.method} Request`, log);
  next();
}

server.use(logger);

const actionRoutes = require("./routes/actionRoutes");
server.use("/actions", actionRoutes);

const projecetRoutes = require("./routes/projecetRoutes");
server.use("/projecets", projecetRoutes);

server.get("/", (req, res) => {
  res.send("This works fine!");
});

const port = 3000;
server.listen(port, () => console.log("The API is alive", port));
