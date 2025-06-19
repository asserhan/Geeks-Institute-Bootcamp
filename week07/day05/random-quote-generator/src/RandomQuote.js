import React, { useState, useEffect } from "react";
import quotes from "./quotes";

const colors = ["#16a085", "#27ae60", "#2c3e50", "#f39c12", "#e74c3c", "#9b59b6", "#FB6964", "#342224"];

function getRandomIndex(arrayLength, exclude) {
  let idx;
  do {
    idx = Math.floor(Math.random() * arrayLength);
  } while (idx === exclude);
  return idx;
}

const RandomQuote = () => {
  const [index, setIndex] = useState(0);
  const [color, setColor] = useState(colors[0]);

  // Generate initial random index on mount
  useEffect(() => {
    const initialIndex = Math.floor(Math.random() * quotes.length);
    const initialColor = colors[Math.floor(Math.random() * colors.length)];
    setIndex(initialIndex);
    setColor(initialColor);
  }, []);

  const handleNewQuote = () => {
    const newIndex = getRandomIndex(quotes.length, index);
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setIndex(newIndex);
    setColor(newColor);
  };

  return (
    <div
      style={{
        backgroundColor: color,
        color: color,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 1s ease"
      }}
    >
      <div
        id="quote-box"
        style={{
          backgroundColor: "white",
          color: color,
          padding: "2rem",
          borderRadius: "10px",
          maxWidth: "600px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
          transition: "color 1s ease"
        }}
      >
        <h1 id="text" style={{ color: color }}>
          "{quotes[index].quote}"
        </h1>
        <p id="author" style={{ textAlign: "right", marginTop: "1rem", fontStyle: "italic" }}>
          - {quotes[index].author}
        </p>
        <button
          id="new-quote"
          onClick={handleNewQuote}
          style={{
            backgroundColor: color,
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            marginTop: "2rem",
            cursor: "pointer",
            borderRadius: "5px",
            transition: "background-color 1s ease"
          }}
        >
          New Quote
        </button>
      </div>
    </div>
  );
};

export default RandomQuote;
