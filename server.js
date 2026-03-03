const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
//const PORT = 5000;
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, "data", "news.json");

// Función segura para leer noticias
const getNews = () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Error leyendo archivo:", error);
    return [];
  }
};

// Obtener todas
app.get("/api/news", (req, res) => {
  res.json(getNews());
});

// Crear noticia
app.post("/api/news", (req, res) => {
  const news = getNews();

  const newNews = {
    ...req.body,
    id: Date.now(),
  };

  news.push(newNews);

  fs.writeFileSync(filePath, JSON.stringify(news, null, 2));
  res.json(newNews);
});

// Editar noticia
app.put("/api/news/:id", (req, res) => {
  let news = getNews();

  news = news.map(item =>
    item.id == req.params.id ? { ...item, ...req.body } : item
  );

  fs.writeFileSync(filePath, JSON.stringify(news, null, 2));
  res.json({ message: "Noticia actualizada" });
});

// Eliminar noticia
app.delete("/api/news/:id", (req, res) => {
  let news = getNews();

  news = news.filter(item => item.id != req.params.id);

  fs.writeFileSync(filePath, JSON.stringify(news, null, 2));
  res.json({ message: "Noticia eliminada" });
});

// Servir frontend compilado
app.use(express.static(path.join(__dirname, "client/dist")));

// Cualquier ruta que no sea /api redirige a index.html
app.all('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
  } else {
    res.status(404).send('API route not found');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});