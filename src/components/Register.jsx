import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, getImageUrl } from "../services/api";
import { carsData } from "../data/cars";
import AvatarModal from "./AvatarModal";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileImg: carsData[0]?.img || "placeholder.png",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rules = [
    { label: "Mínimo de 8 caracteres", test: (val) => val.length >= 8 },
    {
      label: "Pelo menos uma letra maiúscula",
      test: (val) => /[A-Z]/.test(val),
    },
    { label: "Pelo menos um número", test: (val) => /\d/.test(val) },
    {
      label: "Pelo menos um caractere especial",
      test: (val) => /[!@#$%^&*]/.test(val),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!rules.every((r) => r.test(formData.password))) {
      setError("A senha não atende aos requisitos de segurança.");
      return;
    }

    if (formData.password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    const result = await registerUser(formData);

    if (result.success) {
      alert("Conta criada com sucesso!");
      navigate("/login");
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-sans flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_rgba(229,57,53,0.1)_0%,_transparent_60%)] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <form
          onSubmit={handleSubmit}
          className="bg-[#111111] p-8 rounded-2xl border border-white/5 shadow-2xl"
        >
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-gray-500 hover:text-white mb-6 flex items-center text-[10px] tracking-widest uppercase transition-colors"
          >
            ← Voltar ao login
          </button>

          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-[#eaddd7]">
              Crie sua conta
            </h1>
          </div>

          <div className="flex flex-col gap-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <div className="flex flex-col items-center mb-4">
              <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">
                Avatar escolhido
              </label>
              <div
                className="w-20 h-20 rounded-full border-2 border-[#E53935] cursor-pointer overflow-hidden hover:opacity-80 transition-opacity"
                onClick={() => setIsModalOpen(true)}
              >
                <img
                  src={getImageUrl(formData.profileImg)}
                  loading="lazy"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-gray-400 uppercase tracking-widest block mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                required
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-[10px] text-gray-400 uppercase tracking-widest block mb-2">
                E-mail
              </label>
              <input
                type="email"
                required
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-[10px] text-gray-400 uppercase tracking-widest block mb-2">
                Senha
              </label>
              <input
                type="password"
                required
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-[10px] text-gray-400 uppercase tracking-widest block mb-2">
                Confirmar Senha
              </label>
              <input
                type="password"
                required
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E53935] text-white font-bold py-4 rounded-xl hover:bg-red-600 transition-colors mt-4"
            >
              {loading ? "PROCESSANDO..." : "CRIAR CONTA"}
            </button>
          </div>
        </form>
      </div>

      <AvatarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(img) => setFormData({ ...formData, profileImg: img })}
        cars={carsData}
      />
    </div>
  );
}
