function Carousel() {
  const images = [
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg",
    "/images/img4.jpg",
    "/images/img5.jpg",
  ];

  return (
    <section className="bg-gray-100 py-16 overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-12">
          Galeria
        </h2>
      <div className="relative w-full overflow-hidden">

        {/* Fade izquierdo */}
        <div className="pointer-events-none absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-gray-100 to-transparent z-20"></div>

        {/* Fade derecho */}
        <div className="pointer-events-none absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-gray-100 to-transparent z-20"></div>

        {/* Contenedor animado */}
        <div className="flex animate-scroll hover:[animation-play-state:paused]">

          {[...images, ...images].map((img, index) => (
            <div key={index} className="mx-6 flex-shrink-0">
              <img
                src={img}
                alt=""
                className="w-72 md:w-96 h-44 md:h-56 object-cover rounded-2xl shadow-xl
                transition-all duration-500 ease-in-out
                hover:scale-110 hover:z-30"
              />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Carousel;