"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  Building,
  GraduationCap,
  MapPin,
  Calendar,
  FileText,
  FileSignature,
  Save,
  Send,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface CreateFichaProps {
  onTabChange: (tab: string) => void
}

export default function CreateFicha({ onTabChange }: CreateFichaProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Datos iniciales
    centro: "",
    ficha: "",

    // Datos del programa
    nombrePrograma: "",
    codigoPrograma: "",
    versionPrograma: "",
    cupos: "",
    inscritos: "",

    // Datos empresa/población
    municipio: "",
    departamento: "",
    empresa: "",

    // Caracterización especial
    programaEspecial: "",
    programaEspecialOtro: "",

    // Fechas
    fechaInicio: "",
    fechaFin: "",

    // Observaciones
    observaciones: "",

    // Firma
    firmaInstructor: null as File | null,
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const programasEspeciales = [
    "Programa Regular",
    "Convenio Empresarial",
    "Programa Social",
    "Formación Rural",
    "Programa Técnico",
    "Convenio Internacional",
    "Programa de Inclusión",
    "Formación Virtual",
    "Programa Especializado",
    "Convenio Gubernamental",
    "Programa de Innovación",
    "Formación Continua",
    "Otro",
  ]

  const departamentos = [
    "Antioquia",
    "Atlántico",
    "Bogotá D.C.",
    "Bolívar",
    "Boyacá",
    "Caldas",
    "Caquetá",
    "Cauca",
    "Cesar",
    "Córdoba",
    "Cundinamarca",
    "Chocó",
    "Huila",
    "La Guajira",
    "Magdalena",
    "Meta",
    "Nariño",
    "Norte de Santander",
    "Quindío",
    "Risaralda",
    "Santander",
    "Sucre",
    "Tolima",
    "Valle del Cauca",
  ]

  const totalSteps = 6
  const progress = (currentStep / totalSteps) * 100

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.centro) newErrors.centro = "El centro es requerido"
        if (!formData.ficha) newErrors.ficha = "La ficha es requerida"
        break
      case 2:
        if (!formData.nombrePrograma) newErrors.nombrePrograma = "El nombre del programa es requerido"
        if (!formData.codigoPrograma) newErrors.codigoPrograma = "El código del programa es requerido"
        if (!formData.versionPrograma) newErrors.versionPrograma = "La versión del programa es requerida"
        if (!formData.cupos) newErrors.cupos = "Los cupos son requeridos"
        if (!formData.inscritos) newErrors.inscritos = "Los inscritos son requeridos"
        break
      case 3:
        if (!formData.municipio) newErrors.municipio = "El municipio es requerido"
        if (!formData.departamento) newErrors.departamento = "El departamento es requerido"
        break
      case 4:
        if (!formData.programaEspecial) newErrors.programaEspecial = "Debe seleccionar un tipo de programa"
        if (formData.programaEspecial === "Otro" && !formData.programaEspecialOtro) {
          newErrors.programaEspecialOtro = "Especifique el tipo de programa"
        }
        break
      case 5:
        if (!formData.fechaInicio) newErrors.fechaInicio = "La fecha de inicio es requerida"
        if (!formData.fechaFin) newErrors.fechaFin = "La fecha de fin es requerida"
        break
      case 6:
        if (!formData.firmaInstructor) newErrors.firmaInstructor = "La firma del instructor es requerida"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // Aquí se enviaría la ficha al coordinador
      setShowSuccess(true)
      setTimeout(() => {
        onTabChange("fichas")
      }, 2000)
    }
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Datos Iniciales
              </CardTitle>
              <CardDescription>Información básica del centro y la ficha</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="centro">Centro de Formación</Label>
                <Input
                  id="centro"
                  value={formData.centro}
                  onChange={(e) => updateFormData("centro", e.target.value)}
                  placeholder="Nombre del centro de formación"
                />
                {errors.centro && <p className="text-sm text-red-600">{errors.centro}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ficha">Número de Ficha</Label>
                <Input
                  id="ficha"
                  value={formData.ficha}
                  onChange={(e) => updateFormData("ficha", e.target.value)}
                  placeholder="FC-2024-001"
                />
                {errors.ficha && <p className="text-sm text-red-600">{errors.ficha}</p>}
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="mr-2 h-5 w-5" />
                Datos del Programa
              </CardTitle>
              <CardDescription>Información detallada del programa de formación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombrePrograma">Nombre del Programa</Label>
                <Input
                  id="nombrePrograma"
                  value={formData.nombrePrograma}
                  onChange={(e) => updateFormData("nombrePrograma", e.target.value)}
                  placeholder="Excel Básico - Fundamentos de Programación"
                />
                {errors.nombrePrograma && <p className="text-sm text-red-600">{errors.nombrePrograma}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="codigoPrograma">Código del Programa</Label>
                  <Input
                    id="codigoPrograma"
                    value={formData.codigoPrograma}
                    onChange={(e) => updateFormData("codigoPrograma", e.target.value)}
                    placeholder="EXC-001"
                  />
                  {errors.codigoPrograma && <p className="text-sm text-red-600">{errors.codigoPrograma}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="versionPrograma">Versión</Label>
                  <Input
                    id="versionPrograma"
                    value={formData.versionPrograma}
                    onChange={(e) => updateFormData("versionPrograma", e.target.value)}
                    placeholder="1.0"
                  />
                  {errors.versionPrograma && <p className="text-sm text-red-600">{errors.versionPrograma}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cupos">Cupos Disponibles</Label>
                  <Input
                    id="cupos"
                    type="number"
                    value={formData.cupos}
                    onChange={(e) => updateFormData("cupos", e.target.value)}
                    placeholder="25"
                  />
                  {errors.cupos && <p className="text-sm text-red-600">{errors.cupos}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inscritos">Inscritos</Label>
                  <Input
                    id="inscritos"
                    type="number"
                    value={formData.inscritos}
                    onChange={(e) => updateFormData("inscritos", e.target.value)}
                    placeholder="23"
                  />
                  {errors.inscritos && <p className="text-sm text-red-600">{errors.inscritos}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Datos de Ubicación
              </CardTitle>
              <CardDescription>Información de la empresa y/o población objetivo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="departamento">Departamento</Label>
                  <Select
                    value={formData.departamento}
                    onValueChange={(value) => updateFormData("departamento", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {departamentos.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.departamento && <p className="text-sm text-red-600">{errors.departamento}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="municipio">Municipio</Label>
                  <Input
                    id="municipio"
                    value={formData.municipio}
                    onChange={(e) => updateFormData("municipio", e.target.value)}
                    placeholder="Nombre del municipio"
                  />
                  {errors.municipio && <p className="text-sm text-red-600">{errors.municipio}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="empresa">Empresa o Población Objetivo (Opcional)</Label>
                <Input
                  id="empresa"
                  value={formData.empresa}
                  onChange={(e) => updateFormData("empresa", e.target.value)}
                  placeholder="Nombre de la empresa o descripción de la población"
                />
              </div>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Caracterización Especial
              </CardTitle>
              <CardDescription>Tipo de programa o convenio especial</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="programaEspecial">Tipo de Programa</Label>
                <Select
                  value={formData.programaEspecial}
                  onValueChange={(value) => updateFormData("programaEspecial", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo de programa" />
                  </SelectTrigger>
                  <SelectContent>
                    {programasEspeciales.map((programa) => (
                      <SelectItem key={programa} value={programa}>
                        {programa}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.programaEspecial && <p className="text-sm text-red-600">{errors.programaEspecial}</p>}
              </div>

              {formData.programaEspecial === "Otro" && (
                <div className="space-y-2">
                  <Label htmlFor="programaEspecialOtro">Especifica el Tipo de Programa</Label>
                  <Input
                    id="programaEspecialOtro"
                    value={formData.programaEspecialOtro}
                    onChange={(e) => updateFormData("programaEspecialOtro", e.target.value)}
                    placeholder="Describe el tipo de programa"
                  />
                  {errors.programaEspecialOtro && <p className="text-sm text-red-600">{errors.programaEspecialOtro}</p>}
                </div>
              )}
            </CardContent>
          </Card>
        )

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Programación de Fechas
              </CardTitle>
              <CardDescription>Fechas de inicio y finalización del programa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
                  <Input
                    id="fechaInicio"
                    type="date"
                    value={formData.fechaInicio}
                    onChange={(e) => updateFormData("fechaInicio", e.target.value)}
                  />
                  {errors.fechaInicio && <p className="text-sm text-red-600">{errors.fechaInicio}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fechaFin">Fecha de Finalización</Label>
                  <Input
                    id="fechaFin"
                    type="date"
                    value={formData.fechaFin}
                    onChange={(e) => updateFormData("fechaFin", e.target.value)}
                  />
                  {errors.fechaFin && <p className="text-sm text-red-600">{errors.fechaFin}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observaciones">Observaciones</Label>
                <Textarea
                  id="observaciones"
                  value={formData.observaciones}
                  onChange={(e) => updateFormData("observaciones", e.target.value)}
                  placeholder="Observaciones adicionales sobre el programa..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        )

      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileSignature className="mr-2 h-5 w-5" />
                Firma del Instructor
              </CardTitle>
              <CardDescription>Firma digital para validar la ficha de caracterización</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firmaInstructor">Firma Digital (Imagen)</Label>
                <Input
                  id="firmaInstructor"
                  type="file"
                  accept="image/*"
                  onChange={(e) => updateFormData("firmaInstructor", e.target.files?.[0] || null)}
                />
                {errors.firmaInstructor && <p className="text-sm text-red-600">{errors.firmaInstructor}</p>}
                <p className="text-sm text-gray-600">
                  Sube una imagen de tu firma digital. Al firmar, la ficha será enviada al coordinador para su revisión.
                </p>
              </div>

              {showSuccess && (
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-700">
                    ✓ Ficha de caracterización enviada correctamente al coordinador
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nueva Ficha de Caracterización</h1>
        <p className="text-gray-600">Completa todos los pasos para crear tu ficha</p>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                Paso {currentStep} de {totalSteps}
              </span>
              <span>{Math.round(progress)}% completado</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      {renderStep()}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Anterior
        </Button>

        <div className="flex space-x-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Guardar Borrador
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
              Siguiente
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
              <Send className="mr-2 h-4 w-4" />
              Enviar Ficha
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
