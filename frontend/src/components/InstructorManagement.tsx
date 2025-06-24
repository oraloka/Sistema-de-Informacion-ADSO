"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Search, Edit, Trash2, User, Mail, Phone, Building, Sparkles, Star } from "lucide-react"
import type { Instructor } from "@/types"

export default function InstructorManagement() {
  const [instructors, setInstructors] = useState<Instructor[]>([
    {
      id: "2",
      email: "carlos.rodriguez@sena.edu.co",
      name: "Carlos Rodríguez",
      role: "instructor",
      phone: "3007654321",
      center: "Centro de Gestión Agroempresarial del Oriente",
      createdAt: new Date("2024-01-15"),
      createdBy: "1",
    },
    {
      id: "3",
      email: "ana.lopez@sena.edu.co",
      name: "Ana María López",
      role: "instructor",
      phone: "3009876543",
      center: "Centro de Gestión Agroempresarial del Oriente",
      createdAt: new Date("2024-01-10"),
      createdBy: "1",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    center: "",
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const filteredInstructors = instructors.filter(
    (instructor) =>
      instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingInstructor) {
      setInstructors((prev) => prev.map((inst) => (inst.id === editingInstructor.id ? { ...inst, ...formData } : inst)))
    } else {
      const newInstructor: Instructor = {
        id: Date.now().toString(),
        ...formData,
        role: "instructor",
        createdAt: new Date(),
        createdBy: "1",
      }
      setInstructors((prev) => [...prev, newInstructor])
    }

    setFormData({ name: "", email: "", phone: "", center: "" })
    setEditingInstructor(null)
    setIsDialogOpen(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleEdit = (instructor: Instructor) => {
    setEditingInstructor(instructor)
    setFormData({
      name: instructor.name,
      email: instructor.email,
      phone: instructor.phone || "",
      center: instructor.center || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este instructor?")) {
      setInstructors((prev) => prev.filter((inst) => inst.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", center: "" })
    setEditingInstructor(null)
  }

  return (
    <div className="space-y-8">
      {/* Header Elegante */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-slate-300/20 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-10 flex justify-between items-center">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-4xl">👨‍🏫</div>
              <div>
                <h1 className="text-3xl font-bold text-white">Gestión de Instructores</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Sparkles className="h-4 w-4 text-slate-200" />
                  <span className="text-emerald-100 font-medium">Administra los instructores del sistema</span>
                </div>
              </div>
            </div>
          </div>

          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) resetForm()
            }}
          >
            <DialogTrigger asChild>
              <Button className="bg-slate-600/90 backdrop-blur-sm text-white hover:bg-slate-500 font-semibold px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300">
                <Plus className="mr-2 h-5 w-5" />
                Nuevo Instructor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center text-slate-800">
                  <User className="mr-2 h-5 w-5 text-emerald-800" />
                  {editingInstructor ? "Editar Instructor" : "Registrar Nuevo Instructor"}
                </DialogTitle>
                <DialogDescription className="text-slate-600">
                  {editingInstructor
                    ? "Modifica la información del instructor"
                    : "Completa los datos para crear un nuevo instructor"}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-slate-700 flex items-center">
                    <User className="h-4 w-4 mr-2 text-emerald-800" />
                    Nombre Completo
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Nombre completo del instructor"
                    className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700 flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-slate-600" />
                    Correo Electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="instructor@sena.edu.co"
                    className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-slate-700 flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-emerald-800" />
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="3001234567"
                    className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="center" className="text-sm font-medium text-slate-700 flex items-center">
                    <Building className="h-4 w-4 mr-2 text-slate-600" />
                    Centro de Formación
                  </Label>
                  <Input
                    id="center"
                    value={formData.center}
                    onChange={(e) => setFormData((prev) => ({ ...prev, center: e.target.value }))}
                    placeholder="Nombre del centro"
                    className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                  >
                    {editingInstructor ? "Actualizar" : "Registrar"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {showSuccess && (
        <Alert className="border-emerald-200 bg-emerald-50">
          <Star className="h-4 w-4" />
          <AlertDescription className="text-emerald-800">
            ✓ Instructor {editingInstructor ? "actualizado" : "registrado"} correctamente
          </AlertDescription>
        </Alert>
      )}

      {/* Barra de búsqueda */}
      <Card className="border border-slate-200 shadow-sm">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar instructores por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de instructores */}
      <div className="grid gap-4">
        {filteredInstructors.map((instructor) => (
          <Card key={instructor.id} className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-emerald-100 rounded-xl">
                    <User className="h-6 w-6 text-emerald-800" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-800">{instructor.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {instructor.email}
                      </div>
                      {instructor.phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {instructor.phone}
                        </div>
                      )}
                    </div>
                    {instructor.center && (
                      <div className="flex items-center text-sm text-slate-600 mt-1">
                        <Building className="h-4 w-4 mr-1" />
                        {instructor.center}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-200">Activo</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(instructor)}
                    className="border-slate-300 hover:bg-slate-50"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(instructor.id)}
                    className="text-slate-600 hover:text-slate-700 border-slate-300 hover:bg-slate-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInstructors.length === 0 && (
        <Card className="border border-slate-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <div className="text-4xl mb-4">👨‍🏫</div>
              <h3 className="text-lg font-medium text-slate-800 mb-2">No se encontraron instructores</h3>
              <p className="text-slate-600">
                {searchTerm ? "Intenta con otros términos de búsqueda" : "Comienza registrando tu primer instructor"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
