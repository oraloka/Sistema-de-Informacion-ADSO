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
} from "lucide-react"

export default function CoordinadorDashboard() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const stats = [
    {
      title: "Instructores Registrados",
      value: "24",
      description: "Total de instructores activos",
      icon: Users,
      color: "from-green-600 to-green-700",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      change: "+12%",
      trend: "up",
      progress: 85,
    },
    {
      title: "Solicitudes Pendientes",
      value: "8",
      description: "Esperando aprobación",
      icon: Clock,
      color: "from-green-500 to-green-600",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      change: "+3",
      trend: "up",
      progress: 60,
    },
    {
      title: "Fichas Aprobadas",
      value: "156",
      description: "Este mes",
      icon: CheckCircle,
      color: "from-green-700 to-green-800",
      textColor: "text-green-700",
      bgColor: "bg-green-50",
      change: "+23%",
      trend: "up",
      progress: 92,
    },
    {
      title: "Fichas Rechazadas",
      value: "12",
      description: "Requieren corrección",
      icon: XCircle,
      color: "from-green-400 to-green-500",
      textColor: "text-green-500",
      bgColor: "bg-green-50",
      change: "-8%",
      trend: "down",
      progress: 25,
    },
  ]

  const quickActions = [
    {
      title: "Gestionar Instructores",
      description: "Registra y administra instructores",
      icon: Users,
      color: "from-green-600 to-green-700",
      bgColor: "bg-green-50",
      action: "instructors",
    },
    {
      title: "Revisar Solicitudes",
      description: "Aprobar o rechazar fichas",
      icon: FileText,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      action: "requests",
    },
    {
      title: "Ver Reportes",
      description: "Estadísticas y análisis",
      icon: BarChart3,
      color: "from-green-700 to-green-800",
      bgColor: "bg-green-50",
      action: "reports",
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
    },
    {
      id: 2,
      action: "Ficha aprobada",
      instructor: "Ana María López",
      time: "Hace 4 horas",
      status: "aprobada",
      program: "Marketing Digital",
      priority: "medium",
    },
    {
      id: 3,
      action: "Nuevo instructor registrado",
      instructor: "Pedro Martínez",
      time: "Hace 1 día",
      status: "info",
      program: "Registro de usuario",
      priority: "low",
    },
  ]

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Interactivo */}
      <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16 animate-pulse delay-1000"></div>

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-3">Dashboard del Coordinador</h1>
            <p className="text-green-100 text-xl mb-4">Resumen general del sistema de gestión</p>
            <div className="flex items-center space-x-4">
              <Badge className="bg-white/20 text-white border-white/30 px-3 py-1">
                <Calendar className="h-4 w-4 mr-2" />
                Hoy: {new Date().toLocaleDateString()}
              </Badge>
              <Badge className="bg-green-500 text-white px-3 py-1">
                <Zap className="h-4 w-4 mr-2" />
                Sistema Activo
              </Badge>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="p-6 bg-white/20 rounded-2xl backdrop-blur-sm hover:scale-110 transition-transform duration-300">
              <Award className="h-16 w-16 text-white" />
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
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions Interactivas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon
          return (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md group cursor-pointer"
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`p-4 bg-gradient-to-r ${action.color} rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">{action.title}</h3>
                <p className="text-gray-600 mb-6">{action.description}</p>
                <Button
                  className={`bg-gradient-to-r ${action.color} hover:shadow-lg w-full py-3 text-lg font-semibold`}
                >
                  Ir a {action.title}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity Mejorada */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-green-50 border-b">
          <CardTitle className="flex items-center text-2xl">
            <AlertCircle className="mr-3 h-7 w-7 text-green-600" />
            Actividad Reciente
          </CardTitle>
          <CardDescription className="text-lg">Últimas acciones en el sistema</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center space-x-6 p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-white hover:from-green-50 hover:to-white transition-all duration-300 border border-gray-100 hover:border-green-200 hover:shadow-lg group"
              >
                <div
                  className={`p-4 rounded-2xl ${
                    activity.status === "pendiente"
                      ? "bg-green-100"
                      : activity.status === "aprobada"
                        ? "bg-green-200"
                        : "bg-green-50"
                  } group-hover:scale-110 transition-transform`}
                >
                  {activity.status === "pendiente" && <AlertCircle className="h-6 w-6 text-green-600" />}
                  {activity.status === "aprobada" && <CheckCircle className="h-6 w-6 text-green-700" />}
                  {activity.status === "info" && <Users className="h-6 w-6 text-green-500" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <p className="font-bold text-gray-800 text-lg">{activity.action}</p>
                    <Badge
                      className={`${
                        activity.priority === "high"
                          ? "bg-green-200 text-green-800"
                          : activity.priority === "medium"
                            ? "bg-green-100 text-green-700"
                            : "bg-green-50 text-green-600"
                      }`}
                    >
                      {activity.priority === "high" ? "Alta" : activity.priority === "medium" ? "Media" : "Baja"}
                    </Badge>
                  </div>
                  <p className="text-gray-600 font-medium">{activity.instructor}</p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Star className="h-3 w-3 mr-1" />
                    {activity.program}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400 mb-2">{activity.time}</div>
                  <Button variant="outline" size="sm" className="hover:bg-green-50 hover:border-green-300">
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
