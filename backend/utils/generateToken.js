import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (user, expiresIn = '1h') => {
  if (!user || !user.id || !user.correo) {
    throw new Error("Datos de usuario inválidos para generar el token");
  }

  return jwt.sign(
    {
      id: user.id,
      correo: user.correo,
      rol: user.rol
    },
    process.env.JWT_SECRET,
    { expiresIn }
  );
};
