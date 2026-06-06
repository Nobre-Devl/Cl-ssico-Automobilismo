import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePasswordByEmail } from "../services/api";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await updatePasswordByEmail(email, password);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] flex items-center justify-center p-4 font-sans">
      <div className="bg-[#111111] p-10 rounded-2xl w-full max-w-md shadow-[0_0_40px_rgba(229,57,53,0.1)] border border-white/5 flex flex-col items-center">
        <div className="w-full mb-6">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-gray-500 hover:text-white flex items-center text-[10px] tracking-widest uppercase transition-colors"
          >
            ← Voltar ao login
          </button>
        </div>

        <div className="w-24 h-24 mb-8 flex items-center justify-center">
          <img
            src="/img/logo.png"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>

        <h2 className="text-2xl font-medium text-white mb-2 tracking-wide text-center">
          Redefinir senha
        </h2>

        {!submitted ? (
          <>
            <p className="text-sm text-gray-500 mb-8 text-center">
              Digite seu e-mail e a nova senha que deseja utilizar.
            </p>

            {error && (
              <div className="w-full bg-red-500/10 border border-red-500/50 text-red-500 text-xs p-3 rounded-lg mb-5 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="w-full space-y-5">
              <div>
                <label className="block text-xs text-gray-400 mb-2 tracking-wider">
                  EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="exemplo@email.com"
                  className="w-full bg-[#1c1c1c] border border-gray-800 rounded-lg px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#E53935] transition-colors"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-2 tracking-wider">
                  NOVA SENHA
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#1c1c1c] border border-gray-800 rounded-lg px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#E53935] transition-colors"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#E53935] hover:bg-red-600 text-white font-bold py-4 rounded-lg mt-4 transition-colors tracking-widest"
              >
                ALTERAR SENHA
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="text-green-500 mb-4 text-4xl">✓</div>
            <p className="text-sm text-gray-300 mb-8">
              Senha alterada com sucesso! Você já pode entrar com sua nova
              senha.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-[#1c1c1c] hover:bg-[#252525] text-white font-bold py-4 rounded-lg transition-colors"
            >
              VOLTAR AO LOGIN
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
