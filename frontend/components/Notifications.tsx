"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Trash2,
  BookMarkedIcon as MarkAsUnread,
  Clock,
  Sparkles,
} from "lucide-react"
import type { Notification } from "@/types"

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Nueva ficha enviada",
      message: "Carlos Rodríguez ha enviado una nueva ficha de caracterización para 'Excel Básico - Fundamentos'",
      type: "info",
      read: false,
      createdAt: new Date("2024-01-22T10:30:00"),
    },
    {
      id: "2",
      title: "Ficha aprobada",
      message: "La ficha FC-2024-001 de Ana María López ha sido aprobada exitosamente",
      type: "success",
      read: true,
      createdAt: new Date("2024-01-21T15:45:00"),
    },
    {
      id: "3",
      title: "Ficha rechazada",
      message: "La ficha FC-2024-003 requiere correcciones. Se han enviado las observaciones al instructor",
      type: "warning",
      read: false,
      createdAt: new Date("2024-01-21T09:15:00"),
    },
    {
      id: "4",
      title: "Nuevo instructor registrado",
      message: "Se ha registrado un nuevo instructor: Pedro Martínez",
      type: "info",
      read: true,
      createdAt: new Date("2024-01-20T14:20:00"),
    },
    {
      id: "5",
      title: "Sistema actualizado",
      message: "El sistema ha sido actualizado con nuevas funcionalidades de exportación",
      type: "info",
      read: false,
      createdAt: new Date("2024-01-19T08:00:00"),
    },
  ])

  const unreadNotifications = notifications.filter((n) => !n.read)
  const readNotifications = notifications.filter((n) => n.read)

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAsUnread = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: false } : notif)))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-emerald-600" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-slate-600" />
      case "error":
        return <XCircle className="h-5 w-5 text-slate-600" />
      default:
        return <Info className="h-5 w-5 text-slate-600" />
    }
  }

  const getNotificationBg = (type: string, read: boolean) => {
    const baseClass = read ? "bg-slate-50" : "bg-white"
    switch (type) {
      case "success":
        return read ? "bg-emerald-50" : "bg-emerald-50"
      case "warning":
        return read ? "bg-slate-50" : "bg-slate-50"
      case "error":
        return read ? "bg-slate-50" : "bg-slate-50"
      default:
        return baseClass
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (days > 0) {
      return `Hace ${days} día${days > 1 ? "s" : ""}`
    } else if (hours > 0) {
      return `Hace ${hours} hora${hours > 1 ? "s" : ""}`
    } else {
      return "Hace unos minutos"
    }
  }

  const NotificationCard = ({ notification }: { notification: Notification }) => (
    <Card
      className={`${!notification.read ? "border-l-4 border-l-emerald-500" : ""} border border-slate-200 shadow-sm hover:shadow-md transition-shadow`}
    >
      <CardContent className="pt-4">
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg ${getNotificationBg(notification.type, notification.read)}`}>
            {getNotificationIcon(notification.type)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className={`font-medium ${!notification.read ? "text-slate-900" : "text-slate-600"}`}>
                {notification.title}
              </h3>
              {!notification.read && (
                <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs">Nuevo</Badge>
              )}
            </div>

            <p className={`text-sm ${!notification.read ? "text-slate-700" : "text-slate-500"} mb-2`}>
              {notification.message}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-slate-500">
                <Clock className="h-3 w-3 mr-1" />
                {formatTime(notification.createdAt)}
              </div>

              <div className="flex space-x-1">
                {notification.read ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsUnread(notification.id)}
                    className="h-8 px-2 hover:bg-slate-100"
                  >
                    <MarkAsUnread className="h-3 w-3" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                    className="h-8 px-2 hover:bg-slate-100"
                  >
                    <CheckCircle className="h-3 w-3" />
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteNotification(notification.id)}
                  className="h-8 px-2 text-slate-600 hover:text-slate-700 hover:bg-slate-100"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8">
      {/* Header Elegante */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-slate-300/20 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-10 flex justify-between items-center">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-4xl">🔔</div>
              <div>
                <h1 className="text-3xl font-bold text-white">Notificaciones</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Sparkles className="h-4 w-4 text-slate-200" />
                  <span className="text-emerald-100 font-medium">Mantente al día con las actividades del sistema</span>
                </div>
              </div>
            </div>
          </div>

          {unreadNotifications.length > 0 && (
            <Button
              onClick={markAllAsRead}
              className="bg-slate-600/90 backdrop-blur-sm text-white hover:bg-slate-500 font-semibold px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              Marcar todas como leídas
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="all" className="flex items-center data-[state=active]:bg-white">
            <Bell className="h-4 w-4 mr-2" />
            Todas ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread" className="flex items-center data-[state=active]:bg-white">
            <AlertCircle className="h-4 w-4 mr-2" />
            No leídas ({unreadNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="read" className="flex items-center data-[state=active]:bg-white">
            <CheckCircle className="h-4 w-4 mr-2" />
            Leídas ({readNotifications.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => <NotificationCard key={notification.id} notification={notification} />)
          ) : (
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🔔</div>
                  <h3 className="text-lg font-medium text-slate-800 mb-2">No hay notificaciones</h3>
                  <p className="text-slate-600">Te notificaremos cuando haya nuevas actividades</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {unreadNotifications.length > 0 ? (
            unreadNotifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))
          ) : (
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="text-lg font-medium text-slate-800 mb-2">¡Todo al día!</h3>
                  <p className="text-slate-600">No tienes notificaciones sin leer</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="read" className="space-y-4">
          {readNotifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
