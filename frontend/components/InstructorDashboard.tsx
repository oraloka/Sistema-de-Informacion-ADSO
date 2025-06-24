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
  Sparkles,
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
      color: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-400",
      change: "+2 esta semana",
      progress: 75,
      trend: "up",
    },
    {
      title: "En Revisión",
      value: "3",
      description: "Esperando aprobación",
      icon: Clock,
      color: "text-emerald-700",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-400",
      change: "Pendientes",
      progress: 40,
      trend: "neutral",
    },
    {
      title: "Aprobadas",
      value: "8",
      description: "Fichas aprobadas",
      icon: CheckCircle,
      color: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-400",
      change: "+5 este mes",
      progress: 90,
      trend: "up",
    },
    {
      title: "Rechazadas",
      value: "1",
      description: "Requieren corrección",
      icon: XCircle,
      color: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-400",
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
      color: "green",
      borderColor: "border-green-300",
      bgColor: "bg-green-50",
    },
    {
      id: 2,
      programa: "Programación Web",
      ficha: "FC-2024-002",
      status: "pendiente",
      fecha: "2024-01-20",
      cupos: 30,
      priority: "medium",
      color: "emerald",
      borderColor: "border-emerald-300",
      bgColor: "bg-emerald-50",
    },
    {
      id: 3,
      programa: "Marketing Digital",
      ficha: "FC-2024-003",
      status: "rechazada",
      fecha: "2024-01-18",
      cupos: 20,
      priority: "high",
      color: "red",
      borderColor: "border-red-300",
      bgColor: "bg-red-50",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aprobada":
        return "bg-green-100 text-green-700 border-2 border-green-300"
      case "pendiente":
        return "bg-emerald-100 text-emerald-700 border-2 border-emerald-300"
      case "rechazada":
        return "bg-red-100 text-red-700 border-2 border-red-300"
      default:
        return "bg-gray-100 text-gray-700 border-2 border-gray-300"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "aprobada":
        return "Aprobada"
      case "pendiente":
        return "En Revisión"
      case "rechazada":
        return "Rechazada"
      default:
        return status
    }
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Instructor Elegante */}
      <div className="bg-white rounded-2xl p-8 shadow-lg relative overflow-hidden border-4 border-green-400">
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-4xl">👨‍🏫</div>
              <div>
                <h1 className="text-3xl font-bold text-green-700">Dashboard del Instructor</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Sparkles className="h-4 w-4 text-emerald-500" />
                  <span className="text-green-600 font-bold">CampeSena - Tu Espacio Creativo</span>
                </div>
              </div>
            </div>
            <p className="text-green-600 text-lg mb-6 font-medium">Gestiona tus fichas de caracterización SENA</p>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-700 border-2 border-green-300 px-4 py-2 font-bold">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date().toLocaleDateString()}
              </Badge>
              <Badge className="bg-emerald-100 text-emerald-700 border-2 border-emerald-300 px-4 py-2 font-bold">
                <Target className="h-4 w-4 mr-2" />
                Objetivo: 15 fichas
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => onTabChange("create-ficha")}
              className="bg-green-100 text-green-700 hover:bg-green-200 font-bold px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-green-300"
              variant="outline"
            >
              <Plus className="mr-2 h-5 w-5" />
              Nueva Ficha
            </Button>
            <div className="hidden md:block p-6 bg-emerald-50 rounded-xl hover:scale-105 transition-transform duration-300 border-2 border-emerald-300">
              <BookOpen className="h-12 w-12 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Elegantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const isHovered = hoveredCard === index
          return (
            <Card
              key={index}
              className={`overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 ${stat.borderColor} shadow-md cursor-pointer bg-white`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-0">
                <div className={`${stat.bgColor} p-6 relative overflow-hidden`}>
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-3 bg-white rounded-lg shadow-md hover:scale-110 transition-transform border-2 ${stat.borderColor}`}
                      >
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                      <div className={`text-sm font-semibold flex items-center justify-end ${stat.color}`}>
                        {stat.trend === "up" && <TrendingUp className="h-3 w-3 mr-1" />}
                        {stat.trend === "down" && <TrendingUp className="h-3 w-3 mr-1 rotate-180" />}
                        {stat.trend === "neutral" && <Zap className="h-3 w-3 mr-1" />}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white border-t-2 border-gray-200">
                  <h3 className={`font-bold ${stat.color} mb-1`}>{stat.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 font-medium">{stat.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-600 font-medium">
                      <span>Progreso</span>
                      <span>{stat.progress}%</span>
                    </div>
                    <Progress value={stat.progress} className="h-3 border border-gray-200" />
                  </div>
                  <p className="text-xs text-gray-600 font-bold mt-2">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions Elegantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-green-400 shadow-md group cursor-pointer bg-white">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-4">📝</div>
            <div className="p-4 bg-green-50 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md border-2 border-green-300">
              <Plus className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-green-700">Crear Nueva Ficha</h3>
            <p className="text-gray-600 mb-4 font-medium">Inicia el proceso de caracterización de un nuevo programa</p>
            <Button
              onClick={() => onTabChange("create-ficha")}
              className="bg-green-100 text-green-700 border-2 border-green-400 hover:bg-green-200 w-full font-bold shadow-md hover:shadow-lg transition-all duration-300"
              variant="outline"
            >
              Comenzar Ahora
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-emerald-400 shadow-md group cursor-pointer bg-white">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-4">📋</div>
            <div className="p-4 bg-emerald-50 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md border-2 border-emerald-300">
              <FileText className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-emerald-700">Ver Mis Fichas</h3>
            <p className="text-gray-600 mb-4 font-medium">Revisa el estado de todas tus fichas enviadas</p>
            <Button
              onClick={() => onTabChange("fichas")}
              className="bg-emerald-100 text-emerald-700 border-2 border-emerald-400 hover:bg-emerald-200 w-full font-bold shadow-md hover:shadow-lg transition-all duration-300"
              variant="outline"
            >
              Ver Fichas
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Fichas Elegantes */}
      <Card className="border-2 border-green-300 shadow-md bg-white">
        <CardHeader className="bg-green-50 border-b-2 border-green-200">
          <CardTitle className="flex items-center text-xl text-green-700">
            <Award className="mr-3 h-6 w-6 text-green-600" />
            Mis Fichas Recientes
          </CardTitle>
          <CardDescription className="text-green-600 font-medium">
            Últimas fichas de caracterización creadas
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {recentFichas.map((ficha) => (
              <div
                key={ficha.id}
                className={`flex items-center justify-between p-4 border-2 rounded-lg transition-colors duration-200 ${ficha.borderColor} ${ficha.bgColor} hover:shadow-md`}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-bold text-lg text-gray-800">{ficha.programa}</h3>
                    <Badge
                      className={`text-xs font-bold ${
                        ficha.priority === "high"
                          ? "bg-green-100 text-green-700 border-2 border-green-300"
                          : "bg-emerald-100 text-emerald-700 border-2 border-emerald-300"
                      }`}
                    >
                      {ficha.priority === "high" ? "Alta" : ficha.priority === "medium" ? "Media" : "Baja"}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 font-medium">
                    <span className="flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      {ficha.ficha}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {ficha.cupos} cupos
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {ficha.fecha}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-lg text-sm font-bold ${getStatusColor(ficha.status)}`}>
                    {getStatusText(ficha.status)}
                  </span>
                  <Button variant="outline" size="sm" className="text-xs font-bold border-2">
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
