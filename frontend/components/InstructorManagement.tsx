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
import { Plus, Search, Edit, Trash2, User, Mail, Phone, Building } from "lucide-react"
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
      // Editar instructor existente
      setInstructors((prev) => prev.map((inst) => (inst.id === editingInstructor.id ? { ...inst, ...formData } : inst)))
    } else {
      // Crear nuevo instructor
      const newInstructor: Instructor = {
        id: Date.now().toString(),
        ...formData,
        role: "instructor",
        createdAt: new Date(),
        createdBy: "1", // ID del coordinador actual
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Instructores</h1>
          <p className="text-gray-600">Administra los instructores del sistema</p>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Instructor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editingInstructor ? "Editar Instructor" : "Registrar Nuevo Instructor"}</DialogTitle>
              <DialogDescription>
                {editingInstructor
                  ? "Modifica la información del instructor"
                  : "Completa los datos para crear un nuevo instructor"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Nombre completo del instructor"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="instructor@sena.edu.co"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="3001234567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="center">Centro de Formación</Label>
                <Input
                  id="center"
                  value={formData.center}
                  onChange={(e) => setFormData((prev) => ({ ...prev, center: e.target.value }))}
                  placeholder="Nombre del centro"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  {editingInstructor ? "Actualizar" : "Registrar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {showSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-700">
            ✓ Instructor {editingInstructor ? "actualizado" : "registrado"} correctamente
          </AlertDescription>
        </Alert>
      )}

      {/* Barra de búsqueda */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar instructores por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de instructores */}
      <div className="grid gap-4">
        {filteredInstructors.map((instructor) => (
          <Card key={instructor.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-100 rounded-full">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{instructor.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
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
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Building className="h-4 w-4 mr-1" />
                        {instructor.center}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Activo</Badge>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(instructor)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(instructor.id)}
                    className="text-red-600 hover:text-red-700"
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
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron instructores</h3>
              <p className="text-gray-600">
                {searchTerm ? "Intenta con otros términos de búsqueda" : "Comienza registrando tu primer instructor"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
