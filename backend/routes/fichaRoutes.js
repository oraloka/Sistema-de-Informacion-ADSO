import express from "express";
import { crearFicha, obtenerFichas } from "../controllers/fichaController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, crearFicha);
router.get("/", protect, obtenerFichas);

export default router;
