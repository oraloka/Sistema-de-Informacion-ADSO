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
    },
    {
      icon: Users,
      title: "Control de Instructores",
      description: "Registro y seguimiento",
    },
    {
      icon: Award,
      title: "Aprobación Digital",
      description: "Firmas digitales seguras",
    },
    {
      icon: FileText,
      title: "Fichas Digitales",
      description: "Caracterización online",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex">
      {/* Sección Izquierda - Información */}
      <div className="flex-1 bg-gradient-to-br from-green-600 via-green-700 to-green-800 relative overflow-hidden flex items-center justify-center">
        {/* Elementos decorativos */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-16 w-32 h-32 bg-white/5 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-1/4 left-8 w-20 h-20 bg-white/5 rounded-full animate-pulse delay-700"></div>

        <div className="relative z-10 p-12 text-white max-w-lg">
          {/* Logo y Header */}
          <div className="text-center mb-12">
            <div
              className="mx-auto mb-8 p-6 bg-white/20 backdrop-blur-sm rounded-3xl w-fit transform transition-all duration-500 hover:scale-110 hover:rotate-6 cursor-pointer"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              <img
  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mZimonhe4gqnzXFhmpbtfN2IKjEQDh.png"
  alt="SENA Logo"
  className="h-20 w-auto transition-all duration-500 brightness-125 hover:brightness-75"
/>
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Sistema de Gestión
              <span className="block text-green-200 mt-2 text-4xl">SENA</span>
            </h1>

            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Plataforma integral para la gestión de fichas de caracterización y formación complementaria
            </p>

            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="p-3 bg-white/20 rounded-xl">
                <Shield className="h-6 w-6" />
              </div>
              <span className="text-green-100 font-semibold text-lg">Acceso Seguro</span>
              <Sparkles className="h-5 w-5 animate-pulse text-green-300" />
            </div>
          </div>

          {/* Características */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-green-200 mb-6 text-center">¿Qué puedes hacer?</h3>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 group cursor-pointer transform hover:scale-105"
                  >
                    <div className="text-center">
                      <div className="p-3 bg-white/20 rounded-xl w-fit mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h4 className="font-semibold text-white text-sm mb-1">{feature.title}</h4>
                      <p className="text-green-100 text-xs">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Sección Derecha - Formulario */}
      <div className="flex-1 bg-white flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          {/* Header del formulario */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Bienvenido</h2>
            <p className="text-gray-600 text-lg mb-6">Ingresa tus credenciales para continuar</p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto rounded-full"></div>
          </div>

          {/* Formulario */}
          <Card className="p-8 shadow-2xl border-0 bg-gradient-to-br from-white to-green-50">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-bold text-gray-700 flex items-center">
                  <User className="h-5 w-5 mr-2 text-green-600" />
                  Correo electrónico
                </Label>
                <div className="relative group">
                  <Input
                    id="email"
                    type="email"
                    placeholder="usuario@sena.edu.co"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-16 pl-6 pr-6 border-3 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-300 group-hover:border-green-300 text-lg rounded-xl shadow-lg"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-6">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-bold text-gray-700 flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-green-600" />
                  Contraseña
                </Label>
                <div className="relative group">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-16 pl-6 pr-16 border-3 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-300 group-hover:border-green-300 text-lg rounded-xl shadow-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-6 text-gray-400 hover:text-green-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="border-red-200 bg-red-50 animate-shake rounded-xl">
                  <AlertDescription className="text-red-700 font-medium">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-16 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group rounded-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    Iniciar Sesión
                    <ChevronRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </Card>

        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </div>
  )
}
