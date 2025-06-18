import prisma from "../prisma/prismaClient.js";

export const crearFicha = async (req, res) => {
  const { codigo, programa, duracion, modalidad, fechaInicio, fechaFin } = req.body;
  try {
    const ficha = await prisma.ficha.create({
      data: {
        codigo,
        programa,
        duracion,
        modalidad,
        fechaInicio: new Date(fechaInicio),
        fechaFin: new Date(fechaFin),
        instructorId: req.user.id
      }
    });
    res.status(201).json(ficha);
  } catch (error) {
    res.status(500).json({ message: "Error al crear ficha" });
  }
};

export const obtenerFichas = async (req, res) => {
  try {
    const fichas = await prisma.ficha.findMany({
      where: { instructorId: req.user.id }
    });
    res.json(fichas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener fichas" });
  }
};
