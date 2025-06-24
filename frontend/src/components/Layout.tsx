"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Bell, LogOut, Menu, User, FileText, Users, Settings, Home, X } from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const coordinadorMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      id: "profile",
      label: "Mi Perfil",
      icon: User,
      color: "text-emerald-800",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
    {
      id: "instructors",
      label: "Instructores",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      id: "requests",
      label: "Solicitudes",
      icon: FileText,
      color: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      id: "notifications",
      label: "Notificaciones",
      icon: Bell,
      color: "text-emerald-800",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
  ]

  const instructorMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      id: "profile",
      label: "Mi Perfil",
      icon: User,
      color: "text-emerald-800",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
    {
      id: "fichas",
      label: "Mis Fichas",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      id: "create-ficha",
      label: "Nueva Ficha",
      icon: Settings,
      color: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
  ]

  const menuItems = user?.role === "coordinador" ? coordinadorMenuItems : instructorMenuItems

  return (
    <div className="min-h-screen bg-white">
      {/* Header con bordes coloridos */}
      <header className="bg-white shadow-lg border-b-4 border-green-500 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden hover:bg-green-50 text-green-600"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white rounded-lg shadow-md border-2 border-green-400">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mZimonhe4gqnzXFhmpbtfN2IKjEQDh.png"
                  alt="SENA"
                  className="h-8 w-auto"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-green-700">Sistema de Gestión SENA</h1>
                <p className="text-sm text-orange-600 font-medium">Formación Complementaria</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="relative hover:bg-emerald-50 transition-colors text-emerald-800"
              onClick={() => onTabChange("notifications")}
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-orange-500 hover:bg-orange-600 text-xs flex items-center justify-center border-2 border-white">
                3
              </Badge>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:bg-green-50 transition-colors">
                  <Avatar className="h-9 w-9 ring-2 ring-green-400">
                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white font-semibold">
                      {user?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="font-semibold text-green-700">{user?.name}</p>
                    <p className="text-xs text-emerald-800 capitalize">{user?.role}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border-2 border-green-200">
                <DropdownMenuItem onClick={() => onTabChange("profile")} className="hover:bg-green-50">
                  <User className="mr-2 h-4 w-4 text-green-600" />
                  <span className="text-green-700">Mi Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="hover:bg-red-50 text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar con bordes coloridos */}
        <aside
          className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out border-r-4 border-green-400
          lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className="flex items-center justify-between p-6 border-b-2 border-emerald-200 lg:hidden">
            <span className="text-xl font-semibold text-emerald-800">Menú</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="hover:bg-emerald-50 text-emerald-800"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="p-4 bg-white rounded-lg border-2 border-green-300">
                <p className="text-sm font-semibold text-green-700 mb-1">Bienvenido</p>
                <p className="text-xs text-emerald-800 mb-2">{user?.name}</p>
                <Badge className="bg-orange-500 hover:bg-orange-600 text-xs text-white border-2 border-orange-400">
                  {user?.role === "coordinador" ? "Coordinador" : "Instructor"}
                </Badge>
              </div>
            </div>

            <nav className="space-y-3">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start h-12 transition-all duration-200 border-2 ${
                      isActive
                        ? `bg-white ${item.bgColor} ${item.borderColor} ${item.color} shadow-md font-semibold`
                        : `hover:${item.bgColor} ${item.color} border-transparent hover:${item.borderColor}`
                    }`}
                    onClick={() => {
                      onTabChange(item.id)
                      setSidebarOpen(false)
                    }}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${item.color}`} />
                    <span className="font-medium">{item.label}</span>
                  </Button>
                )
              })}
            </nav>

            <div className="mt-8 p-4 bg-white rounded-lg border-2 border-blue-300">
              <p className="text-xs font-semibold text-blue-700 mb-1">💡 Consejo</p>
              <p className="text-xs text-blue-600">Usa Ctrl+B para alternar el menú lateral</p>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
