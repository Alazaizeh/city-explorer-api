"use strict";
const express = require("express");
const cors = require("cors");
const weather = require("./data/weather.json");

const server = express();
const PORT = process.env.PORT || 3002;
server.use(cors());

server.get("/", (req, res) => {
  res.status(200).send(`Welcome Home`);
});
server.get("/weather", (req, res) => {
  let cityName = req.query.searchQuery.replace(/\w+/g, (w) => {
    return w[0].toUpperCase() + w.slice(1).toLowerCase();
  });

  let found = weather.find((ele) =>
    ele.city_name === cityName ? true : false
  );
  if (found) {
    res
      .status(200)
      .send(
        found.data.map(
          (ele) => new Forecast(ele.valid_date, ele.weather.description)
        )
      );
  } else {
    res.status(500).send("NOT FOUND");
  }
});

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}
