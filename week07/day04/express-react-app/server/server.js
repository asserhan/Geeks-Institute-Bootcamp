const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

// GET route
app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello From Express" });
});

// POST route
app.post("/api/world", (req, res) => {
  console.log("Request body:", req.body);
  const { input } = req.body;
  res.send({ message: `I received your POST request. This is what you sent me: ${input}` });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
