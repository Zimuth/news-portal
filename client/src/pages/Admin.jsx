import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

function Admin({ refreshNews }) {
  const [news, setNews] = useState([]);
  const [message, setMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    id: null,
    title: "",
    content: "",
    image: "",
  });

  // Toast temporal
  const showToast = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  // Cargar noticias solo para el panel
  const fetchNews = async () => {
    try {
      const res = await axios.get("/api/news");
      setNews(res.data);
    } catch (error) {
      console.error("Error cargando noticias:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Publicar o actualizar
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (form.id) {
        await axios.put(
          `/api/news/${form.id}`,
          form
        );
        showToast("Noticia actualizada correctamente");
      } else {
        await axios.post("/api/news", {
          ...form,
          date: new Date().toISOString().split("T")[0],
        });
        showToast("Noticia publicada correctamente");
      }

      setForm({ id: null, title: "", content: "", image: "" });

      fetchNews();
      refreshNews(); // 🔥 actualiza Home automáticamente
    } catch (error) {
      console.error("Error guardando noticia:", error);
    }
  };

  // Editar
  const handleEdit = (item) => {
    setForm(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Abrir modal de confirmación
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  // Eliminar confirmado
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/news/${deleteId}`);
      showToast("Noticia eliminada correctamente");
      fetchNews();
      refreshNews(); // 🔥 actualiza Home
    } catch (error) {
      console.error("Error eliminando noticia:", error);
    }

    setShowConfirm(false);
    setDeleteId(null);
  };

  return (
    <div className="max-w-5xl mx-auto py-16 px-6 relative">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Panel de Administración
      </h2>

      {/* Toast emergente */}
      {message && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
          <FaCheckCircle />
          {message}
        </div>
      )}

      {/* Modal Confirmación */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 text-center">
            <FaExclamationTriangle className="text-red-500 text-3xl mx-auto mb-4" />
            <p className="mb-6">¿Estás seguro de eliminar esta noticia?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 space-y-4 mb-10"
      >
        <input
          type="text"
          placeholder="Título"
          className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Contenido"
          rows="4"
          className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={form.content}
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="URL Imagen"
          className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
          required
        />

        <div className="flex justify-end">
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition shadow-md">
            {form.id ? "Actualizar Noticia" : "Publicar Noticia"}
          </button>
        </div>
      </form>

      {/* Lista */}
      <div className="space-y-4">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 shadow rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.date}</p>
            </div>

            <div className="flex gap-4 text-lg">
  <button
    onClick={() => handleEdit(item)}
    className="text-blue-600 hover:text-blue-900 transition duration-200"
    title="Editar"
  >
    <FaEdit />
  </button>

  <button
    onClick={() => confirmDelete(item.id)}
    className="text-blue-700 hover:text-blue-900 transition duration-200"
    title="Eliminar"
  >
    <FaTrash />
  </button>
</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;