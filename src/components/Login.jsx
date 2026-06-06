import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await loginUser(email, password);

    if (result.success) {
      navigate("/catalogo");
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] flex items-center justify-center p-4 font-sans">
      <div className="bg-[#111111] p-10 rounded-2xl w-full max-w-md shadow-[0_0_40px_rgba(229,57,53,0.1)] border border-white/5 flex flex-col items-center">
        <div className="w-40 h-40 mb-10 flex items-center justify-center">
          <img
            src="/img/logo.png"
            alt="Logo"
            className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          />
        </div>

        <h2 className="text-2xl font-medium text-white mb-2 tracking-wide">
          Acesse sua garagem
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Entre para explorar a coleção
        </p>

        {error && (
          <p className="text-red-500 text-xs mb-4 font-bold tracking-wider uppercase">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="w-full space-y-5">
          <div>
            <label className="block text-xs text-gray-400 mb-2 tracking-wider">
              EMAIL
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@email.com"
              className="w-full bg-[#1c1c1c] border border-gray-800 rounded-lg px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#E53935] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2 tracking-wider">
              SENHA
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#1c1c1c] border border-gray-800 rounded-lg px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#E53935] transition-colors"
            />
          </div>

          <div className="flex justify-between text-xs pt-2">
            <button
              type="button"
              className="text-gray-400 hover:text-white transition-colors"
              onClick={() => navigate("/cadastro")}
            >
              Cadastre-se
            </button>
            <button
              type="button"
              className="text-[#E53935] hover:text-red-400 transition-colors"
              onClick={() => navigate("/redefinir-senha")}
            >
              Esqueci a minha senha
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E53935] hover:bg-red-600 text-white font-bold py-4 rounded-lg mt-4 transition-colors tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "CARREGANDO..." : "ENTRAR"}
          </button>
        </form>
      </div>
    </div>
  );
}
