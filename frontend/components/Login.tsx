"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/context/AuthContext"
import {
  Loader2,
  User,
  Lock,
  GraduationCap,
  Users,
  Award,
  Shield,
  Sparkles,
  ChevronRight,
  Eye,
  EyeOff,
  FileText,
  CheckCircle,
  Star,
} from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [logoHovered, setLogoHovered] = useState(false)
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await login(email, password)
    if (!success) {
      setError("Credenciales incorrectas. Intenta de nuevo.")
    }
  }

  const features = [
    {
      icon: GraduationCap,
      title: "Gestión de Programas",
      description: "Administra programas de formación",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
    },
    {
      icon: Users,
      title: "Control de Instructores",
      description: "Registro y seguimiento",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-300",
    },
    {
      icon: Award,
      title: "Aprobación Digital",
      description: "Firmas digitales seguras",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
    },
    {
      icon: FileText,
      title: "Fichas Digitales",
      description: "Caracterización online",
      color: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
    },
  ]

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sección Izquierda - Información */}
      <div className="flex-1 bg-white relative overflow-hidden flex items-center justify-center border-r-4 border-green-400">
        <div className="relative z-10 p-12 max-w-lg">
          {/* Logo y Header */}
          <div className="text-center mb-12">
            <div
              className="mx-auto mb-8 p-6 bg-white rounded-2xl w-fit transform transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg border-4 border-green-400"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mZimonhe4gqnzXFhmpbtfN2IKjEQDh.png"
                alt="SENA Logo"
                className={`h-16 w-auto transition-all duration-300 ${logoHovered ? "brightness-110" : ""}`}
              />
            </div>

            <h1 className="text-4xl font-bold mb-4 leading-tight text-green-700">
              Sistema de Gestión
              <span className="block text-emerald-600 mt-2 text-3xl">CampeSena</span>
            </h1>

            <p className="text-xl text-green-600 mb-8 leading-relaxed font-medium">
              Plataforma integral para la gestión de fichas de caracterización y formación complementaria
            </p>

            <div className="flex items-center justify-center space-x-3 mb-8 p-4 bg-white border-2 border-green-300 rounded-xl">
              <div className="p-3 bg-green-50 rounded-xl border-2 border-green-200">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-green-700 font-bold text-lg">Acceso Seguro</span>
              <Sparkles className="h-4 w-4 text-emerald-500" />
            </div>
          </div>

          {/* Características */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-green-700 mb-6 text-center flex items-center justify-center">
              <Star className="h-5 w-5 mr-2 text-emerald-500" />
              ¿Qué puedes hacer?
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className={`p-4 bg-white backdrop-blur-sm rounded-xl hover:shadow-lg transition-all duration-300 group cursor-pointer border-2 ${feature.borderColor}`}
                  >
                    <div className="text-center">
                      <div
                        className={`p-3 ${feature.bgColor} rounded-xl w-fit mx-auto mb-3 group-hover:scale-105 transition-transform border-2 ${feature.borderColor}`}
                      >
                        <Icon className={`h-5 w-5 ${feature.color}`} />
                      </div>
                      <h4 className={`font-semibold text-sm mb-1 ${feature.color}`}>{feature.title}</h4>
                      <p className="text-gray-600 text-xs">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Información del centro */}
          <div className="mt-12 p-6 bg-white rounded-xl border-2 border-green-300">
            <div className="text-center">
              <div className="text-3xl mb-3">🏛️</div>
              <h4 className="font-bold text-green-700 text-lg mb-2">Centro de Gestión Agroempresarial del Oriente</h4>
              <p className="text-green-600 text-sm mb-3 font-medium">
                Formación para el trabajo y el desarrollo humano
              </p>
              <div className="flex items-center justify-center space-x-2 p-2 bg-green-50 rounded-lg border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 text-sm font-bold">Sistema Activo</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Derecha - Formulario */}
      <div className="flex-1 bg-white flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          {/* Header del formulario */}
          <div className="text-center mb-10">
            <div className="text-4xl mb-4">👋</div>
            <h2 className="text-3xl font-bold text-green-700 mb-4">¡Bienvenido!</h2>
            <p className="text-green-600 text-lg mb-6 font-medium">Ingresa tus credenciales para continuar</p>
            <div className="w-20 h-2 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto rounded-full"></div>
          </div>

          {/* Formulario */}
          <Card className="p-8 shadow-lg border-4 border-green-300 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-bold text-green-700 flex items-center">
                  <User className="h-4 w-4 mr-2 text-green-600" />
                  Correo electrónico
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="usuario@sena.edu.co"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 pl-4 pr-4 border-2 border-green-300 focus:border-green-500 focus:ring-green-500 transition-all duration-300 text-base rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-bold text-emerald-700 flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-emerald-600" />
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pl-4 pr-12 border-2 border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 transition-all duration-300 text-base rounded-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-emerald-400 hover:text-emerald-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="border-2 border-red-300 bg-red-50 rounded-lg">
                  <AlertDescription className="text-red-700 font-medium">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 group rounded-lg border-2 border-green-400"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    Iniciar Sesión
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Credenciales de prueba */}
          <div className="mt-8 p-6 bg-white rounded-xl border-2 border-green-300">
            <div className="text-center">
              <p className="text-sm font-bold text-green-700 mb-4 flex items-center justify-center">
                <Shield className="h-4 w-4 mr-2" />
                Credenciales de Prueba
              </p>
              <div className="space-y-3 text-sm">
                <div className="p-4 bg-white rounded-lg hover:shadow-md transition-colors border-2 border-green-200">
                  <p className="font-bold text-green-700 mb-2 flex items-center justify-center">
                    <User className="h-4 w-4 mr-2" />
                    Coordinador
                  </p>
                  <p className="text-gray-700 font-mono">coordinador@sena.edu.co</p>
                  <p className="text-gray-700 font-mono">123456</p>
                </div>
                <div className="p-4 bg-white rounded-lg hover:shadow-md transition-colors border-2 border-emerald-200">
                  <p className="font-bold text-emerald-700 mb-2 flex items-center justify-center">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Instructor
                  </p>
                  <p className="text-gray-700 font-mono">instructor@sena.edu.co</p>
                  <p className="text-gray-700 font-mono">123456</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
