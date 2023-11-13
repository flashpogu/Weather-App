const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const port = process.env.PORT || 3000;

const fetchWeatherData = async (query) => {
  const options = {
    method: "GET",
    url: `https://weatherapi-com.p.rapidapi.com/current.json?q=${query}`,
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.RAPID_API_HOST,
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch weather data");
  }
};

app.use(cors());

app.get("/", (req, res) => {
  res.send("Weather App");
});

app.get("/app", async (req, res) => {
  const query = req.query.q;
  try {
    const weatherData = await fetchWeatherData(query);
    res.json(weatherData);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running in port ${port}...`);
});
