"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Award,
  BookOpen,
  Users,
  TrendingUp,
  Calendar,
  Target,
  Zap,
} from "lucide-react"

interface InstructorDashboardProps {
  onTabChange: (tab: string) => void
}

export default function InstructorDashboard({ onTabChange }: InstructorDashboardProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const stats = [
    {
      title: "Fichas Creadas",
      value: "12",
      description: "Total de fichas",
      icon: FileText,
      color: "from-green-600 to-green-700",
      change: "+2 esta semana",
      progress: 75,
      trend: "up",
    },
    {
      title: "En Revisión",
      value: "3",
      description: "Esperando aprobación",
      icon: Clock,
      color: "from-green-500 to-green-600",
      change: "Pendientes",
      progress: 40,
      trend: "neutral",
    },
    {
      title: "Aprobadas",
      value: "8",
      description: "Fichas aprobadas",
      icon: CheckCircle,
      color: "from-green-700 to-green-800",
      change: "+5 este mes",
      progress: 90,
      trend: "up",
    },
    {
      title: "Rechazadas",
      value: "1",
      description: "Requieren corrección",
      icon: XCircle,
      color: "from-green-400 to-green-500",
      change: "Para revisar",
      progress: 15,
      trend: "down",
    },
  ]

  const recentFichas = [
    {
      id: 1,
      programa: "Excel Básico - Fundamentos",
      ficha: "FC-2024-001",
      status: "aprobada",
      fecha: "2024-01-15",
      cupos: 25,
      priority: "high",
    },
    {
      id: 2,
      programa: "Programación Web",
      ficha: "FC-2024-002",
      status: "pendiente",
      fecha: "2024-01-20",
      cupos: 30,
      priority: "medium",
    },
    {
      id: 3,
      programa: "Marketing Digital",
      ficha: "FC-2024-003",
      status: "rechazada",
      fecha: "2024-01-18",
      cupos: 20,
      priority: "high",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aprobada":
        return "bg-green-200 text-green-800 border-green-300"
      case "pendiente":
        return "bg-green-100 text-green-700 border-green-200"
      case "rechazada":
        return "bg-green-50 text-green-600 border-green-100"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "aprobada":
        return "✅ Aprobada"
      case "pendiente":
        return "⏳ En Revisión"
      case "rechazada":
        return "❌ Rechazada"
      default:
        return status
    }
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Interactivo */}
      <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16 animate-pulse delay-1000"></div>

        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-3">Dashboard del Instructor</h1>
            <p className="text-green-100 text-xl mb-4">Gestiona tus fichas de caracterización</p>
            <div className="flex items-center space-x-4">
              <Badge className="bg-white/20 text-white border-white/30 px-3 py-1">
                <Calendar className="h-4 w-4 mr-2" />
                Hoy: {new Date().toLocaleDateString()}
              </Badge>
              <Badge className="bg-green-500 text-white px-3 py-1">
                <Target className="h-4 w-4 mr-2" />
                Objetivo: 15 fichas
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => onTabChange("create-ficha")}
              className="bg-white text-green-600 hover:bg-green-50 font-bold px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="mr-2 h-6 w-6" />
              Nueva Ficha
            </Button>
            <div className="hidden md:block p-6 bg-white/20 rounded-2xl backdrop-blur-sm hover:scale-110 transition-transform duration-300">
              <BookOpen className="h-16 w-16 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Interactivas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const isHovered = hoveredCard === index
          return (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg cursor-pointer"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-0">
                <div className={`bg-gradient-to-r ${stat.color} p-6 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="flex items-center justify-between text-white relative z-10">
                    <Icon className={`h-10 w-10 transition-transform duration-300 ${isHovered ? "scale-125" : ""}`} />
                    <div className="text-right">
                      <div className="text-3xl font-bold">{stat.value}</div>
                      <div className="text-sm opacity-90 flex items-center">
                        {stat.trend === "up" && <TrendingUp className="h-3 w-3 mr-1" />}
                        {stat.trend === "down" && <TrendingUp className="h-3 w-3 mr-1 rotate-180" />}
                        {stat.trend === "neutral" && <Zap className="h-3 w-3 mr-1" />}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-800 mb-2">{stat.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{stat.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progreso</span>
                      <span>{stat.progress}%</span>
                    </div>
                    <Progress value={stat.progress} className="h-2" />
                  </div>
                  <p className="text-xs text-green-600 font-semibold mt-2">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions Mejoradas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg group cursor-pointer">
          <CardContent className="p-8 text-center">
            <div className="p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Plus className="h-12 w-12 text-white" />
            </div>
            <h3 className="font-bold text-2xl mb-3 text-gray-800">Crear Nueva Ficha</h3>
            <p className="text-gray-600 mb-6 text-lg">Inicia el proceso de caracterización de un nuevo programa</p>
            <Button
              onClick={() => onTabChange("create-ficha")}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 w-full py-4 text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Comenzar Ahora
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg group cursor-pointer">
          <CardContent className="p-8 text-center">
            <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <FileText className="h-12 w-12 text-white" />
            </div>
            <h3 className="font-bold text-2xl mb-3 text-gray-800">Ver Mis Fichas</h3>
            <p className="text-gray-600 mb-6 text-lg">Revisa el estado de todas tus fichas enviadas</p>
            <Button
              onClick={() => onTabChange("fichas")}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 w-full py-4 text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Ver Fichas
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Fichas Mejoradas */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b">
          <CardTitle className="flex items-center text-2xl">
            <Award className="mr-3 h-7 w-7 text-blue-600" />
            Mis Fichas Recientes
          </CardTitle>
          <CardDescription className="text-lg">Últimas fichas de caracterización creadas</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            {recentFichas.map((ficha) => (
              <div
                key={ficha.id}
                className="flex items-center justify-between p-6 border-2 border-gray-100 rounded-2xl hover:border-green-200 hover:bg-green-50 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-bold text-xl text-gray-800">{ficha.programa}</h3>
                    <Badge
                      className={`${
                        ficha.priority === "high"
                          ? "bg-green-200 text-green-800"
                          : ficha.priority === "medium"
                            ? "bg-green-100 text-green-700"
                            : "bg-green-50 text-green-600"
                      }`}
                    >
                      {ficha.priority === "high" ? "Alta" : ficha.priority === "medium" ? "Media" : "Baja"}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-6 mt-3 text-sm text-gray-600">
                    <span className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      {ficha.ficha}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {ficha.cupos} cupos
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {ficha.fecha}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-4 py-2 rounded-xl text-sm font-bold border-2 ${getStatusColor(ficha.status)} group-hover:scale-105 transition-transform`}
                  >
                    {getStatusText(ficha.status)}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-green-50 hover:border-green-300 px-6 py-2 font-semibold"
                  >
                    Ver Detalles
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
