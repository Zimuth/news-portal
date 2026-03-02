const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = path.join(__dirname, "content", "noticias.json");

// Obtener noticias
app.get("/api/noticias", async (req, res) => {
  const data = await fs.readJson(FILE_PATH);
  res.json(data);
});

// Guardar noticias
app.post("/api/noticias", async (req, res) => {
  await fs.writeJson(FILE_PATH, req.body, { spaces: 2 });
  res.json({ message: "Noticias actualizadas correctamente" });
});

app.listen(5000, () => {
  console.log("Servidor corriendo en puerto 5000");
});