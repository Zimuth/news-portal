function SeccionUno() {
  return (
    <section id="quienes-somos" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 md:flex items-center gap-12">
        
        <img
          src="/images/equipo.jpg"
          alt="Equipo de redacción"
          className="rounded-xl shadow-lg md:w-1/2 mb-8 md:mb-0"
        />

        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            ¿Quiénes Somos?
          </h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            Somos un medio digital comprometido con la información veraz,
            objetiva y oportuna. Nuestro propósito es mantener informada a la
            comunidad con noticias relevantes a nivel local, nacional e
            internacional.
          </p>

          <p className="text-gray-600 mb-4 leading-relaxed">
            Contamos con un equipo de periodistas y colaboradores apasionados
            por la comunicación, dedicados a investigar, analizar y presentar
            los hechos con responsabilidad y ética profesional.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Creemos en el poder de la información como herramienta para el
            desarrollo social, fomentando el pensamiento crítico y la
            participación ciudadana.
          </p>
        </div>
      </div>
    </section>
  );
}

export default SeccionUno;