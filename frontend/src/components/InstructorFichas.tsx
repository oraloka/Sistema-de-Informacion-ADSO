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
import { Search, Eye, Download, Clock, CheckCircle, XCircle, Calendar, FileText, Plus, Sparkles } from "lucide-react"
import type { FichaCaracterizacion } from "@/types"

interface InstructorFichasProps {
  onTabChange: (tab: string) => void
}

export default function InstructorFichas({ onTabChange }: InstructorFichasProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFicha, setSelectedFicha] = useState<FichaCaracterizacion | null>(null)

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
        return <Badge className="bg-slate-100 text-slate-700 border border-slate-200">En Revisión</Badge>
      case "aprobada":
        return <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-200">Aprobada</Badge>
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
          <div>
            <span className="font-medium text-slate-700">Tipo:</span>{" "}
            <span className="text-slate-600">{ficha.programaEspecial}</span>
          </div>
        </div>

        {ficha.status === "rechazada" && ficha.observacionRechazo && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-4">
            <p className="text-sm font-medium text-slate-800 mb-1">Observaciones del Coordinador:</p>
            <p className="text-sm text-slate-700">{ficha.observacionRechazo}</p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedFicha(ficha)}
                className="border-slate-300 hover:bg-slate-50"
              >
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalles
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-slate-800">{ficha.nombrePrograma}</DialogTitle>
                <DialogDescription className="text-slate-600">Ficha: {ficha.ficha}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 text-slate-800">Información del Programa</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium text-slate-700">Código:</span>{" "}
                        <span className="text-slate-600">{ficha.codigoPrograma}</span>
                      </p>
                      <p>
                        <span className="font-medium text-slate-700">Versión:</span>{" "}
                        <span className="text-slate-600">{ficha.versionPrograma}</span>
                      </p>
                      <p>
                        <span className="font-medium text-slate-700">Cupos:</span>{" "}
                        <span className="text-slate-600">{ficha.cupos}</span>
                      </p>
                      <p>
                        <span className="font-medium text-slate-700">Inscritos:</span>{" "}
                        <span className="text-slate-600">{ficha.inscritos}</span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 text-slate-800">Ubicación</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium text-slate-700">Centro:</span>{" "}
                        <span className="text-slate-600">{ficha.centro}</span>
                      </p>
                      <p>
                        <span className="font-medium text-slate-700">Municipio:</span>{" "}
                        <span className="text-slate-600">{ficha.municipio}</span>
                      </p>
                      <p>
                        <span className="font-medium text-slate-700">Departamento:</span>{" "}
                        <span className="text-slate-600">{ficha.departamento}</span>
                      </p>
                      {ficha.empresa && (
                        <p>
                          <span className="font-medium text-slate-700">Empresa:</span>{" "}
                          <span className="text-slate-600">{ficha.empresa}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-slate-800">Fechas de Programación</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <p>
                      <span className="font-medium text-slate-700">Inicio:</span>{" "}
                      <span className="text-slate-600">{ficha.fechaInicio.toLocaleDateString()}</span>
                    </p>
                    <p>
                      <span className="font-medium text-slate-700">Fin:</span>{" "}
                      <span className="text-slate-600">{ficha.fechaFin.toLocaleDateString()}</span>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-slate-800">Tipo de Programa</h4>
                  <p className="text-sm text-slate-600">{ficha.programaEspecial}</p>
                  {ficha.programaEspecialOtro && <p className="text-sm text-slate-600">{ficha.programaEspecialOtro}</p>}
                </div>

                {ficha.observaciones && (
                  <div>
                    <h4 className="font-medium mb-2 text-slate-800">Observaciones</h4>
                    <p className="text-sm text-slate-600">{ficha.observaciones}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-slate-700">Estado:</span>
                    {getStatusBadge(ficha.status)}
                  </div>
                  <p className="text-sm text-slate-600">Actualizada: {ficha.updatedAt.toLocaleDateString()}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex space-x-2">
            {ficha.status === "aprobada" && (
              <Button variant="outline" size="sm" className="border-slate-300 hover:bg-slate-50">
                <Download className="h-4 w-4 mr-1" />
                Descargar
              </Button>
            )}

            {ficha.status === "rechazada" && (
              <Button
                size="sm"
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                onClick={() => onTabChange("create-ficha")}
              >
                Corregir
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

        <div className="relative z-10 flex justify-between items-center">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-4xl">📋</div>
              <div>
                <h1 className="text-3xl font-bold text-white">Mis Fichas de Caracterización</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Sparkles className="h-4 w-4 text-slate-200" />
                  <span className="text-emerald-100 font-medium">Gestiona y revisa tus fichas enviadas</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={() => onTabChange("create-ficha")}
            className="bg-slate-600/90 backdrop-blur-sm text-white hover:bg-slate-500 font-semibold px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Plus className="mr-2 h-5 w-5" />
            Nueva Ficha
          </Button>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <Card className="border border-slate-200 shadow-sm">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar fichas por nombre o número..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="all" className="data-[state=active]:bg-white">
            Todas ({filteredFichas.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center data-[state=active]:bg-white">
            <Clock className="h-4 w-4 mr-2" />
            En Revisión ({pendingFichas.length})
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

        <TabsContent value="all" className="space-y-4">
          {filteredFichas.length > 0 ? (
            filteredFichas.map((ficha) => <FichaCard key={ficha.id} ficha={ficha} />)
          ) : (
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📋</div>
                  <h3 className="text-lg font-medium text-slate-800 mb-2">No se encontraron fichas</h3>
                  <p className="text-slate-600 mb-4">
                    {searchTerm ? "Intenta con otros términos de búsqueda" : "Aún no has creado ninguna ficha"}
                  </p>
                  <Button
                    onClick={() => onTabChange("create-ficha")}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                  >
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
