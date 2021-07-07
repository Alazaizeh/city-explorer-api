"use strict";
const express = require("express");
const cors = require("cors");

require("dotenv").config();
const server = express();
const PORT = process.env.PORT;

const weather = require("./weather");
const movies = require("./movies");

server.use(cors());

server.get("/", (req, res) => {
  res.status(200).send(`City Explorer API`);
});

weather(server);
movies(server);

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
