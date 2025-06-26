import bcrypt from "bcrypt";
import { prisma } from "../server.js"; // Importar instancia de Prisma desde server.js
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { nombre, correo, password, rol, telefono } = req.body;

  console.log("Datos recibidos:", { nombre, correo, rol, telefono });

  // Validaciones básicas
  if (!nombre || !correo || !password || !rol || !telefono) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const existe = await prisma.usuario.findUnique({ where: { correo } });
    if (existe) return res.status(400).json({ message: "Correo ya registrado" });

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Creando usuario con datos:", {
      nombre,
      correo,
      password: hashedPassword,
      rol,
      telefono,
    });

    const nuevoUsuario = await prisma.usuario.create({
      data: { nombre, correo, password: hashedPassword, rol, telefono },
    });

    const token = generateToken(nuevoUsuario, '1h');
    res.status(201).json({ user: nuevoUsuario, token });
  } catch (error) {
    console.error("❌ Error al registrar usuario:");
    console.error(error);
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
};

export const login = async (req, res) => {
  const { correo, password } = req.body;

  // Validaciones básicas
  if (!correo || !password) {
    return res.status(400).json({ message: "Correo y contraseña son obligatorios" });
  }

  try {
    const user = await prisma.usuario.findUnique({ where: { correo } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = generateToken(user, '1h');
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
