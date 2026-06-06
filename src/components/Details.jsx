import { useParams, useNavigate } from "react-router-dom";
import { carsData } from "../data/cars";
import { getImageUrl } from "../services/api";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const car = carsData.find((c) => c.id === parseInt(id));

  if (!car) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white">
        <p className="mb-4">Veículo não encontrado.</p>
        <button
          onClick={() => navigate("/catalogo")}
          className="text-[#E53935] underline"
        >
          Voltar ao catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-sans p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/catalogo")}
          className="text-gray-500 hover:text-white mb-8 text-sm transition-colors flex items-center gap-2"
        >
          &larr; VOLTAR AO SHOWROOM
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            <div className="rounded-3xl overflow-hidden border border-white/5 bg-[#111] shadow-2xl">
              <img
                src={getImageUrl(car.img)}
                alt={car.name}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-4xl md:text-6xl font-bold text-[#eaddd7] mb-4">
                {car.name}
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed">
                {car.desc}
              </p>
            </div>

            <div className="bg-[#111111] p-8 rounded-2xl border border-white/5 shadow-xl mb-8">
              <div className="text-sm text-gray-500 uppercase tracking-widest mb-1">
                POR
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {car.price}
              </div>
              <div className="text-sm text-gray-400 mb-6">
                ou {car.installment}
              </div>
              <button className="w-full bg-[#E53935] hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all tracking-widest text-sm shadow-[0_0_20px_rgba(229,57,53,0.3)]">
                COMPRAR
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#111111] p-6 rounded-2xl border border-white/5">
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                  POTÊNCIA
                </div>
                <div className="text-xl font-bold">{car.power}</div>
              </div>
              <div className="bg-[#111111] p-6 rounded-2xl border border-white/5">
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                  0 A 100
                </div>
                <div className="text-xl font-bold">{car.zeroToHundred}</div>
              </div>
              <div className="bg-[#111111] p-6 rounded-2xl border border-white/5">
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                  VEL. MÁX.
                </div>
                <div className="text-xl font-bold">{car.speed}</div>
              </div>
              <div className="bg-[#111111] p-6 rounded-2xl border border-white/5">
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                  ANO
                </div>
                <div className="text-xl font-bold">{car.year}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
