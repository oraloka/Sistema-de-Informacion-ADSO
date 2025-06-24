"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ColorPalette() {
  const greenShades = [
    { name: "Verde Muy Claro", class: "bg-green-50", text: "text-green-900", hex: "#f0fdf4" },
    { name: "Verde Claro", class: "bg-green-100", text: "text-green-900", hex: "#dcfce7" },
    { name: "Verde Suave", class: "bg-green-200", text: "text-green-900", hex: "#bbf7d0" },
    { name: "Verde Medio", class: "bg-green-300", text: "text-green-900", hex: "#86efac" },
    { name: "Verde", class: "bg-green-400", text: "text-white", hex: "#4ade80" },
    { name: "Verde Intenso", class: "bg-green-500", text: "text-white", hex: "#22c55e" },
    { name: "Verde Fuerte", class: "bg-green-600", text: "text-white", hex: "#16a34a" },
    { name: "Verde Oscuro", class: "bg-green-700", text: "text-white", hex: "#15803d" },
    { name: "Verde Muy Oscuro", class: "bg-green-800", text: "text-white", hex: "#166534" },
    { name: "Verde Profundo", class: "bg-green-900", text: "text-white", hex: "#14532d" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-700">Paleta de Colores Verde SENA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {greenShades.map((shade, index) => (
              <div key={index} className="text-center">
                <div
                  className={`${shade.class} h-20 w-full rounded-lg shadow-lg mb-2 flex items-center justify-center`}
                >
                  <span className={`${shade.text} font-semibold text-sm`}>{index * 100 + 50}</span>
                </div>
                <p className="text-xs font-medium text-gray-700">{shade.name}</p>
                <p className="text-xs text-gray-500 font-mono">{shade.hex}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-green-700 mb-4">Gradientes Utilizados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-green-600 to-green-700 h-16 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">Principal (600-700)</span>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 h-16 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">Secundario (500-600)</span>
              </div>
              <div className="bg-gradient-to-r from-green-700 to-green-800 h-16 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">Énfasis (700-800)</span>
              </div>
              <div className="bg-gradient-to-r from-green-400 to-green-500 h-16 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">Suave (400-500)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
