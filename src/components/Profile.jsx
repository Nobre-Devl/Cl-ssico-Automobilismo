import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, getImageUrl } from "../services/api";
import { carsData } from "../data/cars";
import AvatarModal from "./AvatarModal";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    api
      .get("/users/1")
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar perfil:", error);
        setLoading(false);
      });
  }, []);

  const handleUpdateAvatar = (newImg) => {
    const updatedUser = { ...user, profileImg: newImg };
    api
      .put(`/users/${user.id}`, updatedUser)
      .then(() => setUser(updatedUser))
      .catch((err) => console.error("Erro ao atualizar foto:", err));
  };

  const handleLogout = () => {
    navigate("/login");
  };

  if (loading)
    return <div className="text-white text-center mt-20">Carregando...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] p-6 font-sans">
      <div className="max-w-2xl mx-auto mt-20 bg-[#111111] p-10 rounded-2xl border border-white/5 shadow-2xl">
        <button
          onClick={() => navigate("/catalogo")}
          className="text-gray-500 hover:text-white mb-8 flex items-center text-[10px] tracking-widest uppercase transition-colors"
        >
          ← Voltar ao catálogo
        </button>

        <h1 className="text-3xl font-bold text-[#eaddd7] mb-8">Meu Perfil</h1>

        {user ? (
          <div className="space-y-6">
            <div className="flex items-center gap-6 p-4 bg-[#111111] border border-white/5 rounded-lg">
              <div
                className="relative group cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <img
                  src={
                    user.profileImg
                      ? getImageUrl(user.profileImg)
                      : "/img/placeholder.png"
                  }
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#E53935]"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/img/placeholder.png";
                  }}
                />
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 text-[10px] text-white transition-opacity">
                  EDITAR
                </div>
              </div>
              <div>
                <p className="text-white text-lg font-medium">
                  {user.name || "Usuário"}
                </p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                  Clique na foto para alterar
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#111111] border border-white/5 rounded-lg">
              <label className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">
                E-mail
              </label>
              <p className="text-white text-lg font-medium">{user.email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-6 bg-transparent border border-[#E53935] text-[#E53935] hover:bg-[#E53935] hover:text-white font-bold py-4 rounded-xl transition-all tracking-widest text-sm"
            >
              SAIR DA CONTA
            </button>
          </div>
        ) : (
          <p className="text-red-500">Erro ao carregar dados do usuário.</p>
        )}

        <AvatarModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelect={(img) => handleUpdateAvatar(img)}
          cars={carsData}
        />
      </div>
    </div>
  );
}
