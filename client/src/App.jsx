import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/noticias")
      .then(res => setNews(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Noticias</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {news.map(item => (
          <div key={item.id} className="bg-white shadow rounded-lg p-4">
            <img src={item.imagen} alt="" className="rounded mb-3" />
            <h2 className="text-xl font-semibold">{item.titulo}</h2>
            <p className="text-gray-600">{item.contenido}</p>
            <p className="text-sm text-gray-400 mt-2">{item.fecha}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;