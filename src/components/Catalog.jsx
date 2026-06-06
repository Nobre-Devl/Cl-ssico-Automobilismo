import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api, getImageUrl } from "../services/api";
import { carsData } from "../data/cars";

export default function Catalog() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    api
      .get("/users/1")
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Erro ao buscar usuário", err));

    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const displayCars = useMemo(() => {
    return carsData.filter(
      (car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-sans relative flex flex-col">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,_rgba(229,57,53,0.12)_0%,_rgba(10,10,10,0)_70%)] pointer-events-none z-0"></div>

      <header className="w-full px-6 py-5 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => navigate("/catalogo")}>
            <img src="/img/logo.png" alt="Logo" className="h-10 w-auto" />
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-8 text-xs tracking-widest font-medium text-gray-400 items-center">
              <Link to="/catalogo" className="text-white">
                Catálogo
              </Link>
              <Link to="/perfil" className="hover:text-white transition-colors">
                Perfil
              </Link>
            </nav>

            {user && (
              <img
                src={user.profileImg}
                alt="Perfil"
                className="w-10 h-10 rounded-full border border-[#E53935] object-cover cursor-pointer hover:scale-105 transition-transform"
                onClick={() => navigate("/perfil")}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/img/placeholder.png";
                }}
              />
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20 relative z-10 flex-grow w-full">
        <div className="flex flex-col gap-6 mb-16">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#eaddd7]">
            Showroom Digital
          </h1>
          <input
            type="text"
            placeholder="Buscar modelos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#111] border border-white/10 rounded-xl px-6 py-4 text-sm text-white focus:outline-none focus:border-[#E53935]"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-12 h-12 border-2 border-white/10 border-t-[#E53935] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCars.length > 0 ? (
              displayCars.map((car) => (
                <div
                  key={car.id}
                  onClick={() => navigate(`/detalhes/${car.id}`)}
                  className="bg-[#111111] rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all cursor-pointer"
                >
                  <img
                    src={getImageUrl(car.img)}
                    alt={car.name}
                    loading="lazy"
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-6">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      {car.brand}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {car.name}
                    </h3>
                    <div className="text-2xl font-bold text-[#eaddd7]">
                      {car.price}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                Nenhum carro encontrado.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
