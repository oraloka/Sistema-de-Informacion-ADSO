"use client"

import { useState } from "react"
import { AuthProvider, useAuth } from "@/context/AuthContext"
import Login from "@/components/Login"
import Layout from "@/components/Layout"
import Profile from "@/components/Profile"
import CoordinadorDashboard from "@/components/CoordinadorDashboard"
import InstructorDashboard from "@/components/InstructorDashboard"
import InstructorManagement from "@/components/InstructorManagement"
import RequestManagement from "@/components/RequestManagement"
import CreateFicha from "@/components/CreateFicha"
import InstructorFichas from "@/components/InstructorFichas"
import Notifications from "@/components/Notifications"
import { Loader2 } from "lucide-react"

function AppContent() {
  const { user, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return user.role === "coordinador" ? (
          <CoordinadorDashboard />
        ) : (
          <InstructorDashboard onTabChange={setActiveTab} />
        )
      case "profile":
        return <Profile />
      case "instructors":
        return user.role === "coordinador" ? <InstructorManagement /> : null
      case "requests":
        return user.role === "coordinador" ? <RequestManagement /> : null
      case "notifications":
        return <Notifications />
      case "fichas":
        return user.role === "instructor" ? <InstructorFichas onTabChange={setActiveTab} /> : null
      case "create-ficha":
        return user.role === "instructor" ? <CreateFicha onTabChange={setActiveTab} /> : null
      default:
        return <div>Página no encontrada</div>
    }
  }

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  )
}

export default function Page() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
