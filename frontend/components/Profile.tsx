"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Save, User } from "lucide-react"

export default function Profile() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    center: user?.center || "",
  })
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para actualizar el perfil
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
        <p className="text-gray-600">Actualiza tu información personal</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            Información Personal
          </CardTitle>
          <CardDescription>Mantén tu información actualizada para un mejor servicio</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Tu nombre completo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="tu@sena.edu.co"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="3001234567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="center">Centro de Formación</Label>
                <Input
                  id="center"
                  value={formData.center}
                  onChange={(e) => handleChange("center", e.target.value)}
                  placeholder="Nombre del centro"
                />
              </div>
            </div>

            {saved && (
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-700">✓ Perfil actualizado correctamente</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-end">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
