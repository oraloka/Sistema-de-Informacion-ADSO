import express from 'express';
import jwt from 'jsonwebtoken';
import {
  crearFicha,
  obtenerFichasPorInstructor,
  obtenerFichaPorId,
  actualizarFicha,
  eliminarFicha
} from '../controllers/fichaController.js';

const router = express.Router();

// Middleware de autenticación
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Token requerido" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};

router.post('/', authenticate, crearFicha);
router.get('/instructor', authenticate, obtenerFichasPorInstructor);
router.get('/:id', authenticate, obtenerFichaPorId);
router.put('/:id', authenticate, actualizarFicha);
router.delete('/:id', authenticate, eliminarFicha);

export default router;
