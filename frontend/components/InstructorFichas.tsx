"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Eye, Download, Clock, CheckCircle, XCircle, Calendar, FileText, Plus } from "lucide-react"
import type { FichaCaracterizacion } from "@/types"

interface InstructorFichasProps {
  onTabChange: (tab: string) => void
}

export default function InstructorFichas({ onTabChange }: InstructorFichasProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFicha, setSelectedFicha] = useState<FichaCaracterizacion | null>(null)

  // Datos de ejemplo - en producción vendrían de una API
  const fichas: FichaCaracterizacion[] = [
    {
      id: "1",
      instructorId: "2",
      instructorName: "Carlos Rodríguez",
      status: "aprobada",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-16"),
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
      firmaCoordinador: "firma_coordinador.png",
    },
    {
      id: "2",
      instructorId: "2",
      instructorName: "Carlos Rodríguez",
      status: "pendiente",
      createdAt: new Date("2024-01-20"),
      updatedAt: new Date("2024-01-20"),
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
      fechaInicio: new Date("2024-02-10"),
      fechaFin: new Date("2024-03-10"),
      observaciones: "Convenio con Cámara de Comercio",
    },
    {
      id: "3",
      instructorId: "2",
      instructorName: "Carlos Rodríguez",
      status: "rechazada",
      createdAt: new Date("2024-01-18"),
      updatedAt: new Date("2024-01-19"),
      centro: "Centro de Gestión Agroempresarial del Oriente",
      ficha: "FC-2024-003",
      nombrePrograma: "Programación Web Básica",
      codigoPrograma: "WEB-001",
      versionPrograma: "1.0",
      cupos: 20,
      inscritos: 18,
      municipio: "Envigado",
      departamento: "Antioquia",
      programaEspecial: "Programa Regular",
      fechaInicio: new Date("2024-02-05"),
      fechaFin: new Date("2024-02-25"),
      observaciones: "Programa introductorio",
      observacionRechazo:
        "Faltan datos de la población objetivo y las fechas no coinciden con el calendario académico.",
    },
  ]

  const filteredFichas = fichas.filter(
    (ficha) =>
      ficha.nombrePrograma.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ficha.ficha.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const pendingFichas = filteredFichas.filter((f) => f.status === "pendiente")
  const approvedFichas = filteredFichas.filter((f) => f.status === "aprobada")
  const rejectedFichas = filteredFichas.filter((f) => f.status === "rechazada")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendiente":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            En Revisión
          </Badge>
        )
      case "aprobada":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Aprobada
          </Badge>
        )
      case "rechazada":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Rechazada
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const FichaCard = ({ ficha }: { ficha: FichaCaracterizacion }) => (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{ficha.nombrePrograma}</h3>
            <p className="text-sm text-gray-600">Ficha: {ficha.ficha}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Creada: {ficha.createdAt.toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                {ficha.codigoPrograma}
              </div>
            </div>
          </div>
          {getStatusBadge(ficha.status)}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <span className="font-medium">Cupos:</span> {ficha.cupos}
          </div>
          <div>
            <span className="font-medium">Inscritos:</span> {ficha.inscritos}
          </div>
          <div>
            <span className="font-medium">Ubicación:</span> {ficha.municipio}, {ficha.departamento}
          </div>
          <div>
            <span className="font-medium">Tipo:</span> {ficha.programaEspecial}
          </div>
        </div>

        {ficha.status === "rechazada" && ficha.observacionRechazo && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-sm font-medium text-red-800 mb-1">Observaciones del Coordinador:</p>
            <p className="text-sm text-red-700">{ficha.observacionRechazo}</p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={() => setSelectedFicha(ficha)}>
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalles
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{ficha.nombrePrograma}</DialogTitle>
                <DialogDescription>Ficha: {ficha.ficha}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Información del Programa</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Código:</span> {ficha.codigoPrograma}
                      </p>
                      <p>
                        <span className="font-medium">Versión:</span> {ficha.versionPrograma}
                      </p>
                      <p>
                        <span className="font-medium">Cupos:</span> {ficha.cupos}
                      </p>
                      <p>
                        <span className="font-medium">Inscritos:</span> {ficha.inscritos}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Ubicación</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Centro:</span> {ficha.centro}
                      </p>
                      <p>
                        <span className="font-medium">Municipio:</span> {ficha.municipio}
                      </p>
                      <p>
                        <span className="font-medium">Departamento:</span> {ficha.departamento}
                      </p>
                      {ficha.empresa && (
                        <p>
                          <span className="font-medium">Empresa:</span> {ficha.empresa}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Fechas de Programación</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <p>
                      <span className="font-medium">Inicio:</span> {ficha.fechaInicio.toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium">Fin:</span> {ficha.fechaFin.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Tipo de Programa</h4>
                  <p className="text-sm">{ficha.programaEspecial}</p>
                  {ficha.programaEspecialOtro && <p className="text-sm text-gray-600">{ficha.programaEspecialOtro}</p>}
                </div>

                {ficha.observaciones && (
                  <div>
                    <h4 className="font-medium mb-2">Observaciones</h4>
                    <p className="text-sm">{ficha.observaciones}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Estado:</span>
                    {getStatusBadge(ficha.status)}
                  </div>
                  <p className="text-sm text-gray-600">Actualizada: {ficha.updatedAt.toLocaleDateString()}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex space-x-2">
            {ficha.status === "aprobada" && (
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Descargar
              </Button>
            )}

            {ficha.status === "rechazada" && (
              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => onTabChange("create-ficha")}>
                Corregir
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Fichas de Caracterización</h1>
          <p className="text-gray-600">Gestiona y revisa tus fichas enviadas</p>
        </div>

        <Button onClick={() => onTabChange("create-ficha")} className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Nueva Ficha
        </Button>
      </div>

      {/* Barra de búsqueda */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar fichas por nombre o número..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todas ({filteredFichas.length})</TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            En Revisión ({pendingFichas.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Aprobadas ({approvedFichas.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center">
            <XCircle className="h-4 w-4 mr-2" />
            Rechazadas ({rejectedFichas.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredFichas.length > 0 ? (
            filteredFichas.map((ficha) => <FichaCard key={ficha.id} ficha={ficha} />)
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron fichas</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm ? "Intenta con otros términos de búsqueda" : "Aún no has creado ninguna ficha"}
                  </p>
                  <Button onClick={() => onTabChange("create-ficha")} className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Crear Primera Ficha
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingFichas.map((ficha) => (
            <FichaCard key={ficha.id} ficha={ficha} />
          ))}
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
    </div>
  )
}
