import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-blue-800 text-white pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        {/* Marca */}
        <div>
          <h3 className="text-2xl font-bold mb-4">EL CLARÍN</h3>
          <p className="text-gray-200 text-sm leading-relaxed">
            Medio digital comprometido con la verdad y la información responsable.
          </p>
        </div>

        {/* Enlaces */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li><a href="/#noticias" className="hover:text-white">Noticias</a></li>
            <li><a href="/#quienes-somos" className="hover:text-white">¿Quiénes somos?</a></li>
            <li><a href="/#nuestra-mision" className="hover:text-white">Misión y Visión</a></li>
            <li><a href="/#galeria" className="hover:text-white">Galeria</a></li>
            <li><a href="/admin" className="hover:text-white">Admin</a></li>
          </ul>
        </div>

        {/* Redes */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
          <div className="flex gap-5 text-xl">

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors duration-300"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors duration-300"
            >
              <FaInstagram />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors duration-300"
            >
              <FaTwitter />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors duration-300"
            >
              <FaYoutube />
            </a>

          </div>
        </div>

      </div>

      <div className="border-t border-blue-600 mt-10 pt-4 text-center text-sm text-gray-300">
        © 2026 EL CLARÍN - Todos los derechos reservados
      </div>
    </footer>
  );
}

export default Footer;