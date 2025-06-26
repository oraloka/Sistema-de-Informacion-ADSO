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
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Info className="h-5 w-5 text-blue-600" />
    }
  }

  const getNotificationBg = (type: string, read: boolean) => {
    const opacity = read ? "50" : "100"
    switch (type) {
      case "success":
        return `bg-green-${opacity}`
      case "warning":
        return `bg-yellow-${opacity}`
      case "error":
        return `bg-red-${opacity}`
      default:
        return `bg-blue-${opacity}`
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
    <Card className={`${!notification.read ? "border-l-4 border-l-green-500" : ""}`}>
      <CardContent className="pt-4">
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-full ${getNotificationBg(notification.type, notification.read)}`}>
            {getNotificationIcon(notification.type)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className={`font-medium ${!notification.read ? "text-gray-900" : "text-gray-600"}`}>
                {notification.title}
              </h3>
              {!notification.read && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                  Nuevo
                </Badge>
              )}
            </div>

            <p className={`text-sm ${!notification.read ? "text-gray-700" : "text-gray-500"} mb-2`}>
              {notification.message}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                {formatTime(notification.createdAt)}
              </div>

              <div className="flex space-x-1">
                {notification.read ? (
                  <Button variant="ghost" size="sm" onClick={() => markAsUnread(notification.id)} className="h-8 px-2">
                    <MarkAsUnread className="h-3 w-3" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)} className="h-8 px-2">
                    <CheckCircle className="h-3 w-3" />
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteNotification(notification.id)}
                  className="h-8 px-2 text-red-600 hover:text-red-700"
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notificaciones</h1>
          <p className="text-gray-600">Mantente al día con las actividades del sistema</p>
        </div>

        {unreadNotifications.length > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            <CheckCircle className="mr-2 h-4 w-4" />
            Marcar todas como leídas
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Todas ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread" className="flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            No leídas ({unreadNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="read" className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Leídas ({readNotifications.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => <NotificationCard key={notification.id} notification={notification} />)
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No hay notificaciones</h3>
                  <p className="text-gray-600">Te notificaremos cuando haya nuevas actividades</p>
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
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">¡Todo al día!</h3>
                  <p className="text-gray-600">No tienes notificaciones sin leer</p>
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
