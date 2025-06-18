import bcrypt from "bcrypt";
import prisma from "../prisma/prismaClient.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  try {
    const existe = await prisma.usuario.findUnique({ where: { correo } });
    if (existe) return res.status(400).json({ message: "Correo ya registrado" });

    const hashed = await bcrypt.hash(password, 10);
    const nuevo = await prisma.usuario.create({
      data: { nombre, correo, password: hashed, rol }
    });

    res.status(201).json({ user: nuevo, token: generateToken(nuevo) });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar" });
  }
};

export const login = async (req, res) => {
  const { correo, password } = req.body;
  try {
    const user = await prisma.usuario.findUnique({ where: { correo } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Contraseña incorrecta" });

    res.json({ user, token: generateToken(user) });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
