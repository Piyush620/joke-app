import React, { useEffect, useState } from "react";
import axios from "axios";

const JokeList = () => {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to fetch a new joke
  const fetchJoke = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/jokes")
      .then((response) => {
        setJoke(response.data[0].joke);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the joke!", error);
        setJoke("Sorry, something went wrong.");
        setLoading(false);
      });
  };

  // Fetch a joke when the component first loads
  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="joke-container">
      {/* Add a title at the top */}
      <h1 className="app-title">Joke App</h1>

      <div className="joke-card">
        <p className="joke-text">{loading ? "Loading..." : joke}</p>
      </div>
      <button className="fetch-joke-btn" onClick={fetchJoke}>
        {loading ? "Loading..." : "Get New Joke"}
      </button>
    </div>
  );
};

export default JokeList;
