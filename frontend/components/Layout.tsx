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
import { Bell, LogOut, Menu, User, FileText, Users, Settings, Home, X, Sparkles } from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const coordinadorMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, color: "text-green-600" },
    { id: "profile", label: "Mi Perfil", icon: User, color: "text-blue-600" },
    { id: "instructors", label: "Instructores", icon: Users, color: "text-purple-600" },
    { id: "requests", label: "Solicitudes", icon: FileText, color: "text-orange-600" },
    { id: "notifications", label: "Notificaciones", icon: Bell, color: "text-red-600" },
  ]

  const instructorMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, color: "text-green-600" },
    { id: "profile", label: "Mi Perfil", icon: User, color: "text-blue-600" },
    { id: "fichas", label: "Mis Fichas", icon: FileText, color: "text-purple-600" },
    { id: "create-ficha", label: "Nueva Ficha", icon: Settings, color: "text-orange-600" },
  ]

  const menuItems = user?.role === "coordinador" ? coordinadorMenuItems : instructorMenuItems

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-green-500 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden hover:bg-green-50 hover:text-green-700"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mZimonhe4gqnzXFhmpbtfN2IKjEQDh.png"
                  alt="SENA"
                  className="h-8 w-auto"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  Sistema de Gestión SENA
                </h1>
                <p className="text-sm text-gray-600 flex items-center">
                  <Sparkles className="h-3 w-3 mr-1 text-green-500" />
                  Formación Complementaria
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="relative hover:bg-green-50 hover:text-green-700 transition-colors"
              onClick={() => onTabChange("notifications")}
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 hover:bg-red-600 text-xs">3</Badge>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:bg-green-50 transition-colors">
                  <Avatar className="h-9 w-9 ring-2 ring-green-200">
                    <AvatarFallback className="bg-gradient-to-br from-green-400 to-green-600 text-white font-semibold">
                      {user?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="font-semibold text-gray-800">{user?.name}</p>
                    <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => onTabChange("profile")} className="hover:bg-green-50">
                  <User className="mr-2 h-4 w-4 text-green-600" />
                  Mi Perfil
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
        {/* Sidebar */}
        <aside
          className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out border-r-4 border-green-500
          lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className="flex items-center justify-between p-6 border-b border-green-100 lg:hidden">
            <span className="text-xl font-bold text-green-700">Menú</span>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="hover:bg-green-50">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                <p className="text-sm font-semibold text-green-800">¡Bienvenido!</p>
                <p className="text-xs text-green-600 mt-1">{user?.name}</p>
                <Badge className="mt-2 bg-green-500 hover:bg-green-600 text-xs">
                  {user?.role === "coordinador" ? "Coordinador" : "Instructor"}
                </Badge>
              </div>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start h-12 transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:from-green-600 hover:to-green-700 transform scale-105"
                        : "hover:bg-green-50 hover:text-green-700 hover:translate-x-1"
                    }`}
                    onClick={() => {
                      onTabChange(item.id)
                      setSidebarOpen(false)
                    }}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${isActive ? "text-white" : item.color}`} />
                    <span className="font-medium">{item.label}</span>
                    {isActive && <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>}
                  </Button>
                )
              })}
            </nav>

            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <p className="text-xs font-semibold text-blue-800 mb-1">💡 Consejo</p>
              <p className="text-xs text-blue-600">Usa Ctrl+B para alternar el menú lateral rápidamente</p>
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
          <div className="p-6 min-h-screen">
            <div className="max-w-7xl mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
