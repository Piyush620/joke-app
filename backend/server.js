const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 5000;

// Use CORS middleware to allow requests from the frontend
app.use(cors());

// Joke endpoint
app.get("/api/jokes", async (req, res) => {
  try {
    // Request jokes from JokeAPI
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any", {
      params: {
        type: "single",  // Type of joke (single or twopart)
        format: "json"   // Response format
      }
    });

    // If JokeAPI returns a joke, send it to the frontend
    if (response.data && response.data.joke) {
      res.json([{ joke: response.data.joke }]);
    } else if (response.data && response.data.setup && response.data.delivery) {
      // For two-part jokes
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
