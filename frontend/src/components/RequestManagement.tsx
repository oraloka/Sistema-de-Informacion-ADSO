"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Clock, Download, Eye, Calendar, User, Sparkles, Star } from "lucide-react"
import type { FichaCaracterizacion } from "@/types"

export default function RequestManagement() {
  const [fichas, setFichas] = useState<FichaCaracterizacion[]>([
    {
      id: "1",
      instructorId: "2",
      instructorName: "Carlos Rodríguez",
      status: "pendiente",
      createdAt: new Date("2024-01-20"),
      updatedAt: new Date("2024-01-20"),
      centro: "Centro de Gestión Agroempresarial del Oriente",
      ficha: "FC-2024-001",
      nombrePrograma: "Excel Básico - Fundamentos de Programación",
      codigoPrograma: "EXC-001",
      versionPrograma: "1.0",
      cupos: 25,
      inscritos: 23,
      municipio: "Rionegro",
      departamento: "Antioquia",
      empresa: "Empresas Varias",
      programaEspecial: "Programa Regular",
      fechaInicio: new Date("2024-02-01"),
      fechaFin: new Date("2024-02-15"),
      observaciones: "Programa dirigido a empresarios de la región",
    },
    {
      id: "2",
      instructorId: "3",
      instructorName: "Ana María López",
      status: "aprobada",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-16"),
      centro: "Centro de Gestión Agroempresarial del Oriente",
      ficha: "FC-2024-002",
      nombrePrograma: "Marketing Digital para PYMES",
      codigoPrograma: "MKT-001",
      versionPrograma: "2.0",
      cupos: 30,
      inscritos: 28,
      municipio: "Medellín",
      departamento: "Antioquia",
      programaEspecial: "Convenio Empresarial",
      fechaInicio: new Date("2024-01-20"),
      fechaFin: new Date("2024-02-10"),
      observaciones: "Convenio con Cámara de Comercio",
      firmaCoordinador: "firma_coordinador_123.png",
    },
  ])

  const [selectedFicha, setSelectedFicha] = useState<FichaCaracterizacion | null>(null)
  const [actionType, setActionType] = useState<"aprobar" | "rechazar" | null>(null)
  const [observacionRechazo, setObservacionRechazo] = useState("")
  const [firmaFile, setFirmaFile] = useState<File | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const pendingFichas = fichas.filter((f) => f.status === "pendiente")
  const approvedFichas = fichas.filter((f) => f.status === "aprobada")
  const rejectedFichas = fichas.filter((f) => f.status === "rechazada")

  const handleAction = (ficha: FichaCaracterizacion, action: "aprobar" | "rechazar") => {
    setSelectedFicha(ficha)
    setActionType(action)
    setObservacionRechazo("")
    setFirmaFile(null)
  }

  const handleSubmitAction = () => {
    if (!selectedFicha || !actionType) return

    setFichas((prev) =>
      prev.map((ficha) => {
        if (ficha.id === selectedFicha.id) {
          return {
            ...ficha,
            status: actionType === "aprobar" ? "aprobada" : "rechazada",
            updatedAt: new Date(),
            ...(actionType === "aprobar" && firmaFile ? { firmaCoordinador: firmaFile.name } : {}),
            ...(actionType === "rechazar" ? { observacionRechazo } : {}),
          }
        }
        return ficha
      }),
    )

    setSelectedFicha(null)
    setActionType(null)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendiente":
        return <Badge className="bg-slate-100 text-slate-700 border border-slate-200">Pendiente</Badge>
      case "aprobada":
        return <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200">Aprobada</Badge>
      case "rechazada":
        return <Badge className="bg-slate-100 text-slate-700 border border-slate-200">Rechazada</Badge>
      default:
        return <Badge className="bg-slate-100 text-slate-700 border border-slate-200">{status}</Badge>
    }
  }

  const FichaCard = ({ ficha }: { ficha: FichaCaracterizacion }) => (
    <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg text-slate-800">{ficha.nombrePrograma}</h3>
            <p className="text-sm text-slate-600">Ficha: {ficha.ficha}</p>
            <div className="flex items-center space-x-4 text-sm text-slate-600 mt-2">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {ficha.instructorName}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {ficha.createdAt.toLocaleDateString()}
              </div>
            </div>
          </div>
          {getStatusBadge(ficha.status)}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <span className="font-medium text-slate-700">Código:</span>{" "}
            <span className="text-slate-600">{ficha.codigoPrograma}</span>
          </div>
          <div>
            <span className="font-medium text-slate-700">Cupos:</span>{" "}
            <span className="text-slate-600">{ficha.cupos}</span>
          </div>
          <div>
            <span className="font-medium text-slate-700">Inscritos:</span>{" "}
            <span className="text-slate-600">{ficha.inscritos}</span>
          </div>
          <div>
            <span className="font-medium text-slate-700">Ubicación:</span>{" "}
            <span className="text-slate-600">
              {ficha.municipio}, {ficha.departamento}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm" className="border-slate-300 hover:bg-slate-50">
            <Eye className="h-4 w-4 mr-2" />
            Ver Detalles
          </Button>

          <div className="flex space-x-2">
            {ficha.status === "pendiente" && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-slate-600 hover:text-slate-700 border-slate-300 hover:bg-slate-50"
                  onClick={() => handleAction(ficha, "rechazar")}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Rechazar
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                  onClick={() => handleAction(ficha, "aprobar")}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Aprobar
                </Button>
              </>
            )}

            {(ficha.status === "aprobada" || ficha.status === "rechazada") && (
              <Button variant="outline" size="sm" className="border-slate-300 hover:bg-slate-50">
                <Download className="h-4 w-4 mr-1" />
                Descargar
              </Button>
            )}
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

        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-4xl">📋</div>
            <div>
              <h1 className="text-3xl font-bold text-white">Gestión de Solicitudes</h1>
              <div className="flex items-center space-x-2 mt-1">
                <Sparkles className="h-4 w-4 text-slate-200" />
                <span className="text-emerald-100 font-medium">Revisa y gestiona las fichas de caracterización</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <Alert className="border-emerald-200 bg-emerald-50">
          <Star className="h-4 w-4" />
          <AlertDescription className="text-emerald-700">
            ✓ Ficha {actionType === "aprobar" ? "aprobada" : "rechazada"} correctamente
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="pending" className="flex items-center data-[state=active]:bg-white">
            <Clock className="h-4 w-4 mr-2" />
            Pendientes ({pendingFichas.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center data-[state=active]:bg-white">
            <CheckCircle className="h-4 w-4 mr-2" />
            Aprobadas ({approvedFichas.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center data-[state=active]:bg-white">
            <XCircle className="h-4 w-4 mr-2" />
            Rechazadas ({rejectedFichas.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingFichas.length > 0 ? (
            pendingFichas.map((ficha) => <FichaCard key={ficha.id} ficha={ficha} />)
          ) : (
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">⏰</div>
                  <h3 className="text-lg font-medium text-slate-800 mb-2">No hay solicitudes pendientes</h3>
                  <p className="text-slate-600">Todas las fichas han sido procesadas</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approvedFichas.map((ficha) => (
            <FichaCard key={ficha.id} ficha={ficha} />
          ))}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedFichas.map((ficha) => (
            <FichaCard key={ficha.id} ficha={ficha} />
          ))}
        </TabsContent>
      </Tabs>

      {/* Dialog para aprobar/rechazar */}
      <Dialog
        open={!!selectedFicha && !!actionType}
        onOpenChange={() => {
          setSelectedFicha(null)
          setActionType(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-slate-800">
              {actionType === "aprobar" ? (
                <CheckCircle className="mr-2 h-5 w-5 text-emerald-600" />
              ) : (
                <XCircle className="mr-2 h-5 w-5 text-slate-600" />
              )}
              {actionType === "aprobar" ? "Aprobar Ficha" : "Rechazar Ficha"}
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              {selectedFicha?.nombrePrograma} - {selectedFicha?.ficha}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {actionType === "aprobar" && (
              <div className="space-y-2">
                <Label htmlFor="firma" className="text-sm font-medium text-slate-700">
                  Firma Digital (Imagen)
                </Label>
                <Input
                  id="firma"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFirmaFile(e.target.files?.[0] || null)}
                  className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
                <p className="text-sm text-slate-600">Sube una imagen de tu firma digital para aprobar la ficha</p>
              </div>
            )}

            {actionType === "rechazar" && (
              <div className="space-y-2">
                <Label htmlFor="observacion" className="text-sm font-medium text-slate-700">
                  Observación de Rechazo
                </Label>
                <Textarea
                  id="observacion"
                  value={observacionRechazo}
                  onChange={(e) => setObservacionRechazo(e.target.value)}
                  placeholder="Describe las razones del rechazo y las correcciones necesarias..."
                  className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedFicha(null)
                  setActionType(null)
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSubmitAction}
                className={
                  actionType === "aprobar"
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                    : "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800"
                }
                disabled={
                  (actionType === "aprobar" && !firmaFile) || (actionType === "rechazar" && !observacionRechazo.trim())
                }
              >
                {actionType === "aprobar" ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Aprobar Ficha
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 mr-2" />
                    Rechazar Ficha
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
