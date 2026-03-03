import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/navbar";
import NewsSection from "./components/SeccionNoticias";
import SectionOne from "./components/SeccionUno";
import SectionTwo from "./components/SeccionDos";
import SectionThree from "./components/SeccionTres";
import Footer from "./components/Footer";
import Admin from "./pages/Admin";

function Home({ news }) {
  return (
    <>
      <NewsSection news={news} />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
    </>
  );
}

function App() {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const res = await axios.get("/api/news");
      setNews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("/api/news");
        setNews(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home news={news} />} />
        <Route path="/admin" element={<Admin refreshNews={fetchNews} />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;