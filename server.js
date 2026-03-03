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

// Función segura para leer noticias (usa la versión async de fs)
const getNews = async () => {
  try {
    // crear archivo si no existe
    if (!fs.existsSync(filePath)) {
      await fs.promises.writeFile(filePath, "[]");
    }
    const data = await fs.promises.readFile(filePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Error leyendo archivo:", error);
    return [];
  }
};

// Obtener todas
app.get("/api/news", async (req, res) => {
  const news = await getNews();
  res.json(news);
});

// Crear noticia
app.post("/api/news", async (req, res) => {
  // validación mínima
  const { title, content, image, date } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Título y contenido son obligatorios" });
  }

  const news = await getNews();

  const newNews = {
    id: Date.now(),
    title,
    content,
    image: image || "", // campo opcional
    date: date || new Date().toISOString().split("T")[0],
  };

  news.push(newNews);
  await fs.promises.writeFile(filePath, JSON.stringify(news, null, 2));
  res.json(newNews);
});

// Editar noticia
app.put("/api/news/:id", async (req, res) => {
  const { title, content, image, date } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Título y contenido son obligatorios" });
  }

  let news = await getNews();

  news = news.map(item =>
    item.id == req.params.id
      ? {
          ...item,
          title,
          content,
          image: image !== undefined ? image : item.image,
          date: date || item.date,
        }
      : item
  );

  await fs.promises.writeFile(filePath, JSON.stringify(news, null, 2));
  res.json({ message: "Noticia actualizada" });
});

// Eliminar noticia
app.delete("/api/news/:id", async (req, res) => {
  let news = await getNews();

  news = news.filter(item => item.id != req.params.id);

  await fs.promises.writeFile(filePath, JSON.stringify(news, null, 2));
  res.json({ message: "Noticia eliminada" });
});

// Servir frontend compilado
app.use(express.static(path.join(__dirname, "client/dist")));

// Cualquier ruta que no empiece por /api será servida por el frontend
app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});