"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "@/types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Datos de ejemplo - en producción esto vendría de una API
  const mockUsers: User[] = [
    {
      id: "1",
      email: "coordinador@sena.edu.co",
      name: "María González",
      role: "coordinador",
      phone: "3001234567",
      center: "Centro de Gestión Agroempresarial del Oriente",
      createdAt: new Date(),
    },
    {
      id: "2",
      email: "instructor@sena.edu.co",
      name: "Carlos Rodríguez",
      role: "instructor",
      phone: "3007654321",
      center: "Centro de Gestión Agroempresarial del Oriente",
      createdAt: new Date(),
    },
  ]

  useEffect(() => {
    // Verificar si hay una sesión guardada
    const savedUser = localStorage.getItem("sena-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulación de autenticación
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email)
    if (foundUser && password === "123456") {
      setUser(foundUser)
      localStorage.setItem("sena-user", JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("sena-user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
