"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Award,
  FileText,
  Zap,
  BarChart3,
  Calendar,
  Star,
  Sparkles,
} from "lucide-react"

export default function CoordinadorDashboard() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const stats = [
    {
      title: "Instructores Registrados",
      value: "24",
      description: "Total de instructores activos",
      icon: Users,
      color: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-400",
      change: "+12%",
      trend: "up",
      progress: 85,
      emoji: "👥",
    },
    {
      title: "Solicitudes Pendientes",
      value: "8",
      description: "Esperando aprobación",
      icon: Clock,
      color: "text-orange-700",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-400",
      change: "+3",
      trend: "up",
      progress: 60,
      emoji: "⏰",
    },
    {
      title: "Fichas Aprobadas",
      value: "156",
      description: "Este mes",
      icon: CheckCircle,
      color: "text-purple-700",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-400",
      change: "+23%",
      trend: "up",
      progress: 92,
      emoji: "✅",
    },
    {
      title: "Fichas Rechazadas",
      value: "12",
      description: "Requieren corrección",
      icon: XCircle,
      color: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-400",
      change: "-8%",
      trend: "down",
      progress: 25,
      emoji: "📝",
    },
  ]

  const quickActions = [
    {
      title: "Gestionar Instructores",
      description: "Registra y administra instructores",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-400",
      hoverColor: "hover:bg-green-100",
      action: "instructors",
      emoji: "👨‍🏫",
    },
    {
      title: "Revisar Solicitudes",
      description: "Aprobar o rechazar fichas",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-400",
      hoverColor: "hover:bg-orange-100",
      action: "requests",
      emoji: "📋",
    },
    {
      title: "Ver Reportes",
      description: "Estadísticas y análisis",
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-400",
      hoverColor: "hover:bg-purple-100",
      action: "reports",
      emoji: "📊",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      action: "Nueva ficha enviada",
      instructor: "Carlos Rodríguez",
      time: "Hace 2 horas",
      status: "pendiente",
      program: "Excel Básico",
      priority: "high",
      emoji: "🆕",
      color: "orange",
      borderColor: "border-orange-300",
      bgColor: "bg-orange-50",
    },
    {
      id: 2,
      action: "Ficha aprobada",
      instructor: "Ana María López",
      time: "Hace 4 horas",
      status: "aprobada",
      program: "Marketing Digital",
      priority: "medium",
      emoji: "✅",
      color: "green",
      borderColor: "border-green-300",
      bgColor: "bg-green-50",
    },
    {
      id: 3,
      action: "Nuevo instructor registrado",
      instructor: "Pedro Martínez",
      time: "Hace 1 día",
      status: "info",
      program: "Registro de usuario",
      priority: "low",
      emoji: "👋",
      color: "purple",
      borderColor: "border-purple-300",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Elegante */}
      <div className="bg-white rounded-2xl p-8 shadow-lg relative overflow-hidden border-4 border-green-400">
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-4xl">🏛️</div>
              <div>
                <h1 className="text-3xl font-bold text-green-700">Dashboard del Coordinador</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Sparkles className="h-4 w-4 text-orange-500" />
                  <span className="text-purple-600 font-bold">CampeSena - Sistema de Gestión</span>
                </div>
              </div>
            </div>
            <p className="text-green-600 text-lg font-medium mb-6">
              Sistema de Gestión de Formación Complementaria SENA
            </p>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-700 border-2 border-green-300 px-4 py-2 font-bold">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date().toLocaleDateString()}
              </Badge>
              <Badge className="bg-orange-100 text-orange-700 border-2 border-orange-300 px-4 py-2 font-bold">
                <Zap className="h-4 w-4 mr-2" />
                Sistema Activo
              </Badge>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="p-6 bg-purple-50 rounded-xl hover:scale-105 transition-transform duration-300 border-2 border-purple-300">
              <Award className="h-12 w-12 text-purple-600" />
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
                  <div className="absolute top-2 right-2 text-2xl opacity-80">{stat.emoji}</div>

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
                        {stat.trend === "up" ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
                        )}
                        {stat.change}
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
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions Refinadas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon
          return (
            <Card
              key={index}
              className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 ${action.borderColor} shadow-md group cursor-pointer bg-white`}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{action.emoji}</div>
                <div
                  className={`p-4 ${action.bgColor} rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md border-2 ${action.borderColor}`}
                >
                  <Icon className={`h-8 w-8 ${action.color}`} />
                </div>
                <h3 className={`font-bold text-lg mb-2 ${action.color}`}>{action.title}</h3>
                <p className="text-gray-600 mb-4 font-medium">{action.description}</p>
                <Button
                  className={`${action.bgColor} ${action.color} border-2 ${action.borderColor} ${action.hoverColor} hover:shadow-lg w-full font-bold transition-all duration-300`}
                  variant="outline"
                >
                  Acceder
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity Elegante */}
      <Card className="border-2 border-green-300 shadow-md bg-white">
        <CardHeader className="bg-green-50 border-b-2 border-green-200">
          <CardTitle className="flex items-center text-xl text-green-700">
            <AlertCircle className="mr-3 h-6 w-6 text-green-600" />
            Actividad Reciente del Sistema
          </CardTitle>
          <CardDescription className="text-green-600 font-medium">
            Últimas acciones registradas en la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className={`flex items-center space-x-4 p-4 rounded-lg transition-colors duration-200 border-2 ${activity.borderColor} ${activity.bgColor} hover:shadow-md`}
              >
                <div className="text-3xl">{activity.emoji}</div>
                <div className={`p-3 rounded-lg bg-white border-2 ${activity.borderColor}`}>
                  {activity.status === "pendiente" && <AlertCircle className="h-5 w-5 text-orange-600" />}
                  {activity.status === "aprobada" && <CheckCircle className="h-5 w-5 text-green-600" />}
                  {activity.status === "info" && <Users className="h-5 w-5 text-purple-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-bold text-gray-800">{activity.action}</p>
                    <Badge
                      className={`text-xs font-bold ${
                        activity.priority === "high"
                          ? "bg-green-100 text-green-700 border-2 border-green-300"
                          : activity.priority === "medium"
                            ? "bg-orange-100 text-orange-700 border-2 border-orange-300"
                            : "bg-purple-100 text-purple-700 border-2 border-purple-300"
                      }`}
                    >
                      {activity.priority === "high" ? "Alta" : activity.priority === "medium" ? "Media" : "Baja"}
                    </Badge>
                  </div>
                  <p className="text-green-700 font-bold">{activity.instructor}</p>
                  <p className="text-sm text-gray-600 flex items-center mt-1 font-medium">
                    <Star className="h-3 w-3 mr-1" />
                    {activity.program}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-2 font-medium">{activity.time}</div>
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
