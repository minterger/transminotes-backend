import jwt from "jsonwebtoken";
import User from "../models/User";

/**
 * funcion para generar jsonwebtoken
 * @param {String} id id del usuario para generar el token
 * @returns token generado
 */
export const genToken = (id) => {
  const token = jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "6h",
  });
  return token;
};

export const verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization)
      return res.status(401).json({ message: "Accso no autorizado" });

    const data = jwt.verify(authorization, process.env.SECRET);

    const user = await User.findById(data.id).select("-password");

    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(400).json({ message: "Usuario inexistente" });
    }
  } catch (error) {
    if (error.expiredAt) {
      return res.status(400).json({ message: "Sesion Expirada" });
    } else {
      return res.status(401).json({ message: "Acceso no autorizado" });
    }
  }
};
