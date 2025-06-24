export interface User {
  id: string
  email: string
  name: string
  role: "coordinador" | "instructor"
  phone?: string
  center?: string
  createdAt: Date
}

export interface Instructor extends User {
  role: "instructor"
  createdBy: string
}

export interface FichaCaracterizacion {
  id: string
  instructorId: string
  instructorName: string
  status: "pendiente" | "aprobada" | "rechazada"
  createdAt: Date
  updatedAt: Date

  // Datos iniciales
  centro: string
  ficha: string

  // Datos del programa
  nombrePrograma: string
  codigoPrograma: string
  versionPrograma: string
  cupos: number
  inscritos: number

  // Datos empresa/población
  municipio: string
  departamento: string
  empresa?: string

  // Caracterización especial
  programaEspecial: string
  programaEspecialOtro?: string

  // Fechas
  fechaInicio: Date
  fechaFin: Date

  // Observaciones y firma
  observaciones: string
  firmaInstructor?: string

  // Aprobación
  firmaCoordinador?: string
  observacionRechazo?: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: Date
}
