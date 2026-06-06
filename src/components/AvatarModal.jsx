export default function AvatarModal({ isOpen, onClose, onSelect, cars }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#111] p-6 rounded-2xl w-full max-w-lg border border-white/10 shadow-2xl flex flex-col max-h-[80vh]">
        <h2 className="text-white font-bold mb-4 tracking-widest uppercase text-sm">
          Escolha seu Avatar
        </h2>

        <div className="grid grid-cols-5 gap-3 overflow-y-auto pr-2 custom-scrollbar max-h-[50vh]">
          {cars
            .filter((car) => car.img !== "logo.png")
            .map((car, i) => (
              <button
                key={i}
                onClick={() => {
                  onSelect(car.img);
                  onClose();
                }}
                className="w-12 h-12 rounded-full overflow-hidden border-2 border-transparent hover:border-[#E53935] transition-all focus:outline-none"
              >
                <img
                  src={car.img}
                  alt={car.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/img/placeholder.png";
                  }}
                />
              </button>
            ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 text-gray-500 hover:text-white text-xs uppercase tracking-widest transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
