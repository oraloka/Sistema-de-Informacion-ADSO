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
import { Badge } from "@/components/ui/badge"
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
  CheckCircle,
  Star,
  Target,
  Sparkles,
} from "lucide-react"

interface CreateFichaProps {
  onTabChange: (tab: string) => void
}

export default function CreateFicha({ onTabChange }: CreateFichaProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    centro: "",
    ficha: "",
    nombrePrograma: "",
    codigoPrograma: "",
    versionPrograma: "",
    cupos: "",
    inscritos: "",
    municipio: "",
    departamento: "",
    empresa: "",
    programaEspecial: "",
    programaEspecialOtro: "",
    fechaInicio: "",
    fechaFin: "",
    observaciones: "",
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

  const stepTitles = [
    "Datos Iniciales",
    "Programa de Formación",
    "Ubicación y Empresa",
    "Caracterización Especial",
    "Fechas y Observaciones",
    "Firma Digital",
  ]

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
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-slate-200">
              <CardTitle className="flex items-center text-xl text-slate-800">
                <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                  <Building className="h-6 w-6 text-emerald-800" />
                </div>
                Datos Iniciales
                <Badge className="ml-auto bg-emerald-100 text-emerald-800 border border-emerald-200">Paso 1/6</Badge>
              </CardTitle>
              <CardDescription className="text-slate-600">
                Información básica del centro y la ficha de caracterización
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="centro" className="text-sm font-medium text-slate-700 flex items-center">
                  <Building className="h-4 w-4 mr-2 text-emerald-800" />
                  Centro de Formación
                </Label>
                <Input
                  id="centro"
                  value={formData.centro}
                  onChange={(e) => updateFormData("centro", e.target.value)}
                  placeholder="Nombre del centro de formación"
                  className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
                {errors.centro && (
                  <p className="text-sm text-rose-600 flex items-center">
                    <Target className="h-3 w-3 mr-1" />
                    {errors.centro}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ficha" className="text-sm font-medium text-slate-700 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-amber-600" />
                  Número de Ficha
                </Label>
                <Input
                  id="ficha"
                  value={formData.ficha}
                  onChange={(e) => updateFormData("ficha", e.target.value)}
                  placeholder="FC-2024-001"
                  className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
                {errors.ficha && (
                  <p className="text-sm text-rose-600 flex items-center">
                    <Target className="h-3 w-3 mr-1" />
                    {errors.ficha}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-slate-200">
              <CardTitle className="flex items-center text-xl text-slate-800">
                <div className="p-2 bg-amber-100 rounded-lg mr-3">
                  <GraduationCap className="h-6 w-6 text-amber-600" />
                </div>
                Programa de Formación
                <Badge className="ml-auto bg-amber-100 text-amber-700 border border-amber-200">Paso 2/6</Badge>
              </CardTitle>
              <CardDescription className="text-slate-600">
                Información detallada del programa de formación
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nombrePrograma" className="text-sm font-medium text-slate-700 flex items-center">
                  <Star className="h-4 w-4 mr-2 text-emerald-800" />
                  Nombre del Programa
                </Label>
                <Input
                  id="nombrePrograma"
                  value={formData.nombrePrograma}
                  onChange={(e) => updateFormData("nombrePrograma", e.target.value)}
                  placeholder="Excel Básico - Fundamentos de Programación"
                  className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
                {errors.nombrePrograma && (
                  <p className="text-sm text-rose-600 flex items-center">
                    <Target className="h-3 w-3 mr-1" />
                    {errors.nombrePrograma}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="codigoPrograma" className="text-sm font-medium text-slate-700 flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-amber-600" />
                    Código del Programa
                  </Label>
                  <Input
                    id="codigoPrograma"
                    value={formData.codigoPrograma}
                    onChange={(e) => updateFormData("codigoPrograma", e.target.value)}
                    placeholder="EXC-001"
                    className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                  {errors.codigoPrograma && (
                    <p className="text-sm text-rose-600 flex items-center">
                      <Target className="h-3 w-3 mr-1" />
                      {errors.codigoPrograma}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="versionPrograma" className="text-sm font-medium text-slate-700 flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-emerald-800" />
                    Versión
                  </Label>
                  <Input
                    id="versionPrograma"
                    value={formData.versionPrograma}
                    onChange={(e) => updateFormData("versionPrograma", e.target.value)}
                    placeholder="1.0"
                    className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                  {errors.versionPrograma && (
                    <p className="text-sm text-rose-600 flex items-center">
                      <Target className="h-3 w-3 mr-1" />
                      {errors.versionPrograma}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cupos" className="text-sm font-medium text-slate-700 flex items-center">
                    <Target className="h-4 w-4 mr-2 text-amber-600" />
                    Cupos Disponibles
                  </Label>
                  <Input
                    id="cupos"
                    type="number"
                    value={formData.cupos}
                    onChange={(e) => updateFormData("cupos", e.target.value)}
                    placeholder="25"
                    className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                  {errors.cupos && (
                    <p className="text-sm text-rose-600 flex items-center">
                      <Target className="h-3 w-3 mr-1" />
                      {errors.cupos}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inscritos" className="text-sm font-medium text-slate-700 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-emerald-800" />
                    Inscritos
                  </Label>
                  <Input
                    id="inscritos"
                    type="number"
                    value={formData.inscritos}
                    onChange={(e) => updateFormData("inscritos", e.target.value)}
                    placeholder="23"
                    className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                  {errors.inscritos && (
                    <p className="text-sm text-rose-600 flex items-center">
                      <Target className="h-3 w-3 mr-1" />
                      {errors.inscritos}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-slate-200">
              <CardTitle className="flex items-center text-xl text-slate-800">
                <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                  <MapPin className="h-6 w-6 text-emerald-800" />
                </div>
                Ubicación y Empresa
                <Badge className="ml-auto bg-emerald-100 text-emerald-800 border border-emerald-200">Paso 3/6</Badge>
              </CardTitle>
              <CardDescription className="text-slate-600">
                Información de la empresa y/o población objetivo
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="departamento" className="text-sm font-medium text-slate-700 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-emerald-800" />
                    Departamento
                  </Label>
                  <Select
                    value={formData.departamento}
                    onValueChange={(value) => updateFormData("departamento", value)}
                  >
                    <SelectTrigger className="border-slate-300 focus:border-emerald-800 focus:ring-emerald-500">
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
                  {errors.departamento && (
                    <p className="text-sm text-rose-600 flex items-center">
                      <Target className="h-3 w-3 mr-1" />
                      {errors.departamento}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="municipio" className="text-sm font-medium text-slate-700 flex items-center">
                    <Building className="h-4 w-4 mr-2 text-amber-600" />
                    Municipio
                  </Label>
                  <Input
                    id="municipio"
                    value={formData.municipio}
                    onChange={(e) => updateFormData("municipio", e.target.value)}
                    placeholder="Nombre del municipio"
                    className="border-slate-300 focus:border-emerald-800 focus:ring-emerald-500"
                  />
                  {errors.municipio && (
                    <p className="text-sm text-rose-600 flex items-center">
                      <Target className="h-3 w-3 mr-1" />
                      {errors.municipio}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="empresa" className="text-sm font-medium text-slate-700 flex items-center">
                  <Star className="h-4 w-4 mr-2 text-emerald-800" />
                  Empresa o Población Objetivo (Opcional)
                </Label>
                <Input
                  id="empresa"
                  value={formData.empresa}
                  onChange={(e) => updateFormData("empresa", e.target.value)}
                  placeholder="Nombre de la empresa o descripción de la población"
                  className="border-slate-300 focus:border-emerald-800 focus:ring-emerald-800"
                />
              </div>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-slate-200">
              <CardTitle className="flex items-center text-xl text-slate-800">
                <div className="p-2 bg-amber-100 rounded-lg mr-3">
                  <FileText className="h-6 w-6 text-amber-600" />
                </div>
                Caracterización Especial
                <Badge className="ml-auto bg-amber-100 text-amber-700 border border-amber-200">Paso 4/6</Badge>
              </CardTitle>
              <CardDescription className="text-slate-600">Tipo de programa o convenio especial</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="programaEspecial" className="text-sm font-medium text-slate-700 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-emerald-800" />
                  Tipo de Programa
                </Label>
                <Select
                  value={formData.programaEspecial}
                  onValueChange={(value) => updateFormData("programaEspecial", value)}
                >
                  <SelectTrigger className="border-slate-300 focus:border-emerald-800 focus:ring-emerald-800">
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
                {errors.programaEspecial && (
                  <p className="text-sm text-rose-600 flex items-center">
                    <Target className="h-3 w-3 mr-1" />
                    {errors.programaEspecial}
                  </p>
                )}
              </div>

              {formData.programaEspecial === "Otro" && (
                <div className="space-y-2">
                  <Label
                    htmlFor="programaEspecialOtro"
                    className="text-sm font-medium text-slate-700 flex items-center"
                  >
                    <Star className="h-4 w-4 mr-2 text-amber-600" />
                    Especifica el Tipo de Programa
                  </Label>
                  <Input
                    id="programaEspecialOtro"
                    value={formData.programaEspecialOtro}
                    onChange={(e) => updateFormData("programaEspecialOtro", e.target.value)}
                    placeholder="Describe el tipo de programa"
                    className="border-slate-300 focus:border-emerald-800 focus:ring-emerald-800"
                  />
                  {errors.programaEspecialOtro && (
                    <p className="text-sm text-rose-600 flex items-center">
                      <Target className="h-3 w-3 mr-1" />
                      {errors.programaEspecialOtro}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )

      case 5:
        return (
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-slate-200">
              <CardTitle className="flex items-center text-xl text-slate-800">
                <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                  <Calendar className="h-6 w-6 text-emerald-800" />
                </div>
                Fechas y Observaciones
                <Badge className="ml-auto bg-emerald-100 text-emerald-800 border border-emerald-200">Paso 5/6</Badge>
              </CardTitle>
              <CardDescription className="text-slate-600">Fechas de inicio y finalización del programa</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fechaInicio" className="text-sm font-medium text-slate-700 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-emerald-800" />
                    Fecha de Inicio
                  </Label>
                  <Input
                    id="fechaInicio"
                    type="date"
                    value={formData.fechaInicio}
                    onChange={(e) => updateFormData("fechaInicio", e.target.value)}
                    className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                  {errors.fechaInicio && (
                    <p className="text-sm text-rose-600 flex items-center">
                      <Target className="h-3 w-3 mr-1" />
                      {errors.fechaInicio}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fechaFin" className="text-sm font-medium text-slate-700 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-amber-600" />
                    Fecha de Finalización
                  </Label>
                  <Input
                    id="fechaFin"
                    type="date"
                    value={formData.fechaFin}
                    onChange={(e) => updateFormData("fechaFin", e.target.value)}
                    className="border-slate-300 focus:border-emerald-800 focus:ring-emerald-500"
                  />
                  {errors.fechaFin && (
                    <p className="text-sm text-rose-600 flex items-center">
                      <Target className="h-3 w-3 mr-1" />
                      {errors.fechaFin}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observaciones" className="text-sm font-medium text-slate-700 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-emerald-800" />
                  Observaciones
                </Label>
                <Textarea
                  id="observaciones"
                  value={formData.observaciones}
                  onChange={(e) => updateFormData("observaciones", e.target.value)}
                  placeholder="Observaciones adicionales sobre el programa..."
                  rows={4}
                  className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </CardContent>
          </Card>
        )

      case 6:
        return (
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-slate-200">
              <CardTitle className="flex items-center text-xl text-slate-800">
                <div className="p-2 bg-amber-100 rounded-lg mr-3">
                  <FileSignature className="h-6 w-6 text-amber-600" />
                </div>
                Firma Digital
                <Badge className="ml-auto bg-amber-100 text-amber-700 border border-amber-200">Paso 6/6</Badge>
              </CardTitle>
              <CardDescription className="text-slate-600">
                Firma digital para validar la ficha de caracterización
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="firmaInstructor" className="text-sm font-medium text-slate-700 flex items-center">
                  <FileSignature className="h-4 w-4 mr-2 text-emerald-800" />
                  Firma Digital (Imagen)
                </Label>
                <Input
                  id="firmaInstructor"
                  type="file"
                  accept="image/*"
                  onChange={(e) => updateFormData("firmaInstructor", e.target.files?.[0] || null)}
                  className="border-slate-300 focus:border-emerald-800 focus:ring-emerald-800"
                />
                {errors.firmaInstructor && (
                  <p className="text-sm text-rose-600 flex items-center">
                    <Target className="h-3 w-3 mr-1" />
                    {errors.firmaInstructor}
                  </p>
                )}
                <p className="text-sm text-slate-600 flex items-center">
                  <Star className="h-3 w-3 mr-1" />
                  Sube una imagen de tu firma digital. Al firmar, la ficha será enviada al coordinador para su revisión.
                </p>
              </div>

              {showSuccess && (
                <Alert className="border-emerald-200 bg-emerald-50">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-emerald-800">
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
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-300/20 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-4xl">📝</div>
            <div>
              <h1 className="text-3xl font-bold text-white">Nueva Ficha de Caracterización</h1>
              <div className="flex items-center space-x-2 mt-1">
                <Sparkles className="h-4 w-4 text-amber-200" />
                <span className="text-emerald-100 font-medium">Completa todos los pasos para crear tu ficha</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <Card className="border border-slate-200 shadow-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-slate-800">{stepTitles[currentStep - 1]}</span>
              <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-200">
                Paso {currentStep} de {totalSteps}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Progreso del formulario</span>
                <span>{Math.round(progress)}% completado</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            {/* Step indicators */}
            <div className="flex justify-between mt-4">
              {stepTitles.map((title, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index + 1 < currentStep
                        ? "bg-emerald-500 text-white"
                        : index + 1 === currentStep
                          ? "bg-amber-500 text-white"
                          : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {index + 1 < currentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
                  </div>
                  <span className="text-xs text-slate-600 text-center max-w-20">{title}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      {renderStep()}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="border-slate-300 text-slate-700 hover:bg-slate-50"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Anterior
        </Button>

        <div className="flex space-x-3">
          <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
            <Save className="mr-2 h-4 w-4" />
            Guardar Borrador
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-emerald-500 to-emerald-800 hover:from-emerald-600 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all duration-300"
            >
              Siguiente
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Send className="mr-2 h-4 w-4" />
              Enviar Ficha
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
