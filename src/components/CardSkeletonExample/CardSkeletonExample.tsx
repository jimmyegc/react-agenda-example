import { useState, useEffect } from "react";

export default function CardSkeletonExample() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula la carga de datos (por ejemplo, una API)
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-sm mx-auto p-4">
      {loading ? <SkeletonCard /> : <RealCard />}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="p-4 border rounded-lg shadow-lg animate-pulse">
      {/* Imagen */}
      <div className="h-40 bg-gray-300 rounded-lg"></div>

      {/* Texto */}
      <div className="mt-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
}

function RealCard() {
  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <img
        src="https://placehold.co/300"
        alt="Imagen de ejemplo"
        className="h-40 w-full object-cover rounded-lg"
      />
      <h2 className="mt-4 text-lg font-semibold">Título de la Card</h2>
      <p className="text-gray-600">Descripción de la tarjeta cargada.</p>
    </div>
  );
}
