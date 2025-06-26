import { prisma } from "../server.js"; // Importar instancia de Prisma desde server.js

export const crearFicha = async (req, res) => {
  const { codigo, programa, duracion, modalidad, fechaInicio, fechaFin, instructorId } = req.body;
  const usuario = req.user; // Obtenido del middleware de autenticación

  if (!usuario || usuario.rol !== "COORDINADOR") {
    return res.status(403).json({ message: "Solo coordinadores pueden crear fichas" });
  }

  if (!codigo || !programa || !duracion || !modalidad || !fechaInicio || !fechaFin || !instructorId) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const nuevaFicha = await prisma.ficha.create({
      data: {
        codigo,
        programa,
        duracion: parseInt(duracion),
        modalidad,
        fechaInicio: new Date(fechaInicio),
        fechaFin: new Date(fechaFin),
        instructorId: parseInt(instructorId),
      },
    });
    res.status(201).json(nuevaFicha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la ficha" });
  }
};

export const obtenerFichasPorInstructor = async (req, res) => {
  const usuario = req.user; // Obtenido del middleware de autenticación

  if (!usuario || usuario.rol !== "INSTRUCTOR") {
    return res.status(403).json({ message: "Solo instructores pueden ver sus fichas" });
  }

  try {
    const fichas = await prisma.ficha.findMany({
      where: { instructorId: usuario.id },
    });
    res.json(fichas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las fichas" });
  }
};

export const obtenerFichaPorId = async (req, res) => {
  const { id } = req.params;
  const usuario = req.user;

  try {
    const ficha = await prisma.ficha.findUnique({
      where: { id: parseInt(id) },
    });
    if (!ficha) return res.status(404).json({ message: "Ficha no encontrada" });
    // Solo el instructor asignado o el coordinador puede verla
    if (usuario.rol === "INSTRUCTOR" && ficha.instructorId !== usuario.id) {
      return res.status(403).json({ message: "No tienes permiso para ver esta ficha" });
    }
    res.json(ficha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la ficha" });
  }
};

export const actualizarFicha = async (req, res) => {
  const { id } = req.params;
  const { codigo, programa, duracion, modalidad, fechaInicio, fechaFin, instructorId, estado, observacion, coordinadorId } = req.body;
  const usuario = req.user;

  if (!usuario || usuario.rol !== "COORDINADOR") {
    return res.status(403).json({ message: "Solo coordinadores pueden actualizar fichas" });
  }

  try {
    const fichaActualizada = await prisma.ficha.update({
      where: { id: parseInt(id) },
      data: {
        codigo,
        programa,
        duracion: duracion ? parseInt(duracion) : undefined,
        modalidad,
        fechaInicio: fechaInicio ? new Date(fechaInicio) : undefined,
        fechaFin: fechaFin ? new Date(fechaFin) : undefined,
        instructorId: instructorId ? parseInt(instructorId) : undefined,
        estado,
        observacion,
        coordinadorId: coordinadorId ? parseInt(coordinadorId) : undefined,
      },
    });
    res.json(fichaActualizada);
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Ficha no encontrada" });
    }
    res.status(500).json({ message: "Error al actualizar la ficha" });
  }
};

export const eliminarFicha = async (req, res) => {
  const { id } = req.params;
  const usuario = req.user;

  if (!usuario || usuario.rol !== "COORDINADOR") {
    return res.status(403).json({ message: "Solo coordinadores pueden eliminar fichas" });
  }

  try {
    await prisma.ficha.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Ficha eliminada exitosamente" });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Ficha no encontrada" });
    }
    res.status(500).json({ message: "Error al eliminar la ficha" });
  }
};