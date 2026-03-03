import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">EL CLARIN</h1>

        {/* Botón móvil */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Links */}
        <ul className={`md:flex gap-6 ${isOpen ? "block mt-4" : "hidden md:flex"}`}>
          <li><Link to="/" className="hover:text-gray-300">Inicio</Link></li>
          <li><a href="#quienes-somos" className="hover:text-gray-300">¿Quienes somos?</a></li>
          <li><a href="#nuestra-mision" className="hover:text-gray-300">Misión y Visión</a></li>
          <li><a href="#galeria" className="hover:text-gray-300">Galeria</a></li>
          <li><Link to="/admin" className="hover:text-gray-300">Admin</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;