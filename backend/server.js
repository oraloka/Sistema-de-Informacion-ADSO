import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/authRoutes.js";
import fichaRoutes from "./routes/fichaRoutes.js";

// Cargar variables de entorno
dotenv.config();

// Inicializar PrismaClient
export const prisma = new PrismaClient();

const app = express();

app.use(cors({ origin: "http://localhost:3000" })); // Configura CORS para tu frontend
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/fichas", fichaRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error interno del servidor" });
});

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT} a las ${new Date().toLocaleTimeString()}`);
});
