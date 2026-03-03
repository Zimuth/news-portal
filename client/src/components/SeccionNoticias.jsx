import { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function SeccionNoticias({ news = [] }) {
  const [expandedId, setExpandedId] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const scrollRef = useRef(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 350;

    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  // Detectar si necesita scroll
  useEffect(() => {
    const checkOverflow = () => {
      const container = scrollRef.current;
      if (!container) return;

      const hasOverflow =
        container.scrollWidth > container.clientWidth;

      setShowButtons(hasOverflow);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () =>
      window.removeEventListener("resize", checkOverflow);
  }, [news]);

  return (
    <section id="noticias" className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 relative">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Noticias destacadas
        </h2>

        {/* Botón izquierda */}
        {showButtons && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full z-10 hover:bg-gray-200 transition"
          >
            <FaChevronLeft />
          </button>
        )}

        <div
          ref={scrollRef}
          className={`flex gap-6 scroll-smooth ${
            showButtons
              ? "overflow-x-auto"
              : "justify-center"
          } no-scrollbar`}
        >
          {news.map((item) => {
            const isExpanded = expandedId === item.id;
            const shortText =
              item.content.length > 120
                ? item.content.slice(0, 120) + "..."
                : item.content;

            return (
              <div
                key={item.id}
                className="min-w-[320px] max-w-[320px] bg-white shadow-lg rounded-xl overflow-hidden flex-shrink-0 hover:scale-105 transition duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 mt-2 text-sm">
                    {isExpanded ? item.content : shortText}
                  </p>

                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="text-blue-600 mt-2 text-sm font-semibold hover:underline"
                  >
                    {isExpanded ? "Ver menos" : "Ver más"}
                  </button>

                  <p className="text-xs text-gray-400 mt-3">
                    {item.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón derecha */}
        {showButtons && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full z-10 hover:bg-gray-200 transition"
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </section>
  );
}

export default SeccionNoticias;