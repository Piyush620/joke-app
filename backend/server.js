const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.get("/api/jokes", async (req, res) => {
  try {
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any", {
      params: {
        type: "single",
        format: "json"   
      }
    });
    if (response.data && response.data.joke) {
      res.json([{ joke: response.data.joke }]);
    } else if (response.data && response.data.setup && response.data.delivery) {
      res.json([{ joke: `${response.data.setup} - ${response.data.delivery}` }]);
    } else {
      res.json([{ joke: "No joke found." }]);
    }
  } catch (error) {
    console.error("Error fetching jokes:", error);
    res.status(500).json([{ joke: "Error fetching jokes." }]);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
