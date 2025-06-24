"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Save, User, Mail, Phone, Building, Shield, Star, Calendar, MapPin } from "lucide-react"

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
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header del Perfil */}
      <div className="bg-white rounded-2xl p-8 shadow-lg relative overflow-hidden border-4 border-green-400">
        <div className="relative z-10 flex items-center space-x-6">
          <Avatar className="h-24 w-24 ring-4 ring-green-400">
            <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white text-2xl font-bold">
              {user?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-green-700 mb-2">{user?.name}</h1>
            <div className="flex items-center space-x-4 mb-3">
              <Badge className="bg-green-100 text-green-700 border-2 border-green-300 px-3 py-1 font-bold">
                <Shield className="h-4 w-4 mr-2" />
                {user?.role === "coordinador" ? "Coordinador" : "Instructor"}
              </Badge>
              <Badge className="bg-orange-100 text-orange-700 border-2 border-orange-300 px-3 py-1 font-bold">
                <Star className="h-4 w-4 mr-2" />
                Usuario Activo
              </Badge>
            </div>
            <p className="text-emerald-500 flex items-center font-bold">
              <Building className="h-4 w-4 mr-2" />
              {user?.center}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Información Personal */}
        <div className="lg:col-span-2">
          <Card className="border-2 border-green-300 shadow-md">
            <CardHeader className="bg-green-50 border-b-2 border-green-200">
              <CardTitle className="flex items-center text-xl text-green-700">
                <User className="mr-3 h-6 w-6 text-green-600" />
                Información Personal
              </CardTitle>
              <CardDescription className="text-green-600 font-medium">
                Mantén tu información actualizada para un mejor servicio
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-bold text-green-700 flex items-center">
                      <User className="h-4 w-4 mr-2 text-green-600" />
                      Nombre Completo
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Tu nombre completo"
                      className="border-2 border-green-300 focus:border-green-500 focus:ring-green-500 font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-bold text-orange-700 flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-orange-600" />
                      Correo Electrónico
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="tu@sena.edu.co"
                      className="border-2 border-orange-300 focus:border-orange-500 focus:ring-orange-500 font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-bold text-emerald-500 flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-emerald-500" />
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="3001234567"
                      className="border-2 border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="center" className="text-sm font-bold text-green-700 flex items-center">
                      <Building className="h-4 w-4 mr-2 text-green-600" />
                      Centro de Formación
                    </Label>
                    <Input
                      id="center"
                      value={formData.center}
                      onChange={(e) => handleChange("center", e.target.value)}
                      placeholder="Nombre del centro"
                      className="border-2 border-green-300 focus:border-green-500 focus:ring-green-500 font-medium"
                    />
                  </div>
                </div>

                {saved && (
                  <Alert className="border-2 border-green-300 bg-green-50">
                    <AlertDescription className="text-green-700 flex items-center font-bold">
                      <Star className="h-4 w-4 mr-2" />
                      Perfil actualizado correctamente
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-green-100 text-green-700 border-2 border-green-400 hover:bg-green-200 shadow-md hover:shadow-lg transition-all duration-300 font-bold"
                    variant="outline"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Cambios
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Estadísticas del Usuario */}
          <Card className="border-2 border-orange-300 shadow-md">
            <CardHeader className="bg-orange-50 border-b-2 border-orange-200">
              <CardTitle className="text-lg text-orange-700 flex items-center">
                <Star className="mr-2 h-5 w-5 text-orange-600" />
                Estadísticas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 font-medium">Fichas Creadas</span>
                <Badge className="bg-green-100 text-green-700 border-2 border-green-300 font-bold">
                  {user?.role === "instructor" ? "12" : "156"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 font-medium">Tiempo en Sistema</span>
                <Badge className="bg-orange-100 text-orange-700 border-2 border-orange-300 font-bold">6 meses</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 font-medium">Último Acceso</span>
                <Badge className="bg-emerald-100 text-emerald-500 border-2 border-emerald-300 font-bold">Hoy</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Información del Sistema */}
          <Card className="border-2 border-emerald-300 shadow-md">
            <CardHeader className="bg-emerald-50 border-b-2 border-emerald-200">
              <CardTitle className="text-lg text-emerald-500 flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-emerald-500" />
                Información del Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <div className="text-2xl mb-2">🏛️</div>
                <h3 className="font-bold text-green-700 mb-1">CampeSena</h3>
                <p className="text-sm text-orange-600 mb-3 font-medium">Sistema de Gestión SENA</p>
                <div className="flex items-center justify-center space-x-2 p-2 bg-green-50 rounded-lg border-2 border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-700 font-bold">Sistema Activo</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Centro de Formación */}
          <Card className="border-2 border-green-300 shadow-md">
            <CardHeader className="bg-green-50 border-b-2 border-green-200">
              <CardTitle className="text-lg text-green-700 flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-green-600" />
                Mi Centro
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl mb-2">🏢</div>
                <h3 className="font-bold text-orange-700 mb-1">Centro de Gestión</h3>
                <p className="text-sm text-emerald-500 mb-2 font-medium">Agroempresarial del Oriente</p>
                <Badge className="bg-green-100 text-green-700 border-2 border-green-300 text-xs font-bold">
                  Antioquia, Colombia
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
