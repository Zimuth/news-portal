function SeccionDos() {
  return (
    <section id="nuestra-mision" className="bg-gray-100 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Misión y Visión
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          
          {/* Misión */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-left">
            <h3 className="text-2xl font-bold mb-4 text-blue-700">
              Misión
            </h3>
            <p className="text-gray-700 leading-relaxed">
              En El Clarín nos comprometemos a informar con veracidad,
              independencia y responsabilidad social. Nuestro objetivo es
              brindar noticias oportunas, claras y confiables que contribuyan
              al desarrollo democrático, cultural y social de nuestra
              comunidad. Trabajamos con ética periodística, promoviendo el
              análisis crítico y el acceso a información transparente para
              todos nuestros lectores.
            </p>
          </div>

          {/* Visión */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-left">
            <h3 className="text-2xl font-bold mb-4 text-blue-700">
              Visión
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Aspiramos a consolidarnos como un referente informativo a nivel
              nacional, destacándonos por la innovación digital, la calidad
              periodística y el compromiso con la verdad. Buscamos ser un medio
              que fortalezca la participación ciudadana, impulse el diálogo
              constructivo y contribuya a una sociedad más informada y
              consciente.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default SeccionDos;