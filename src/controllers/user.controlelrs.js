import { genToken } from "../helpers/jsonwebtoken.js";
import User from "../models/User.js";

export const getUser = (req, res) => {
  const user = req.user;
  if (user) {
    return res.json(user);
  }
  return res.status(500).json({ message: "Internal Server Error" });
};

export const signup = async (req, res) => {
  const { username, password, confirm_password } = req.body;
  try {
    if (password !== confirm_password)
      res.status(404).json({ message: "Las contraseñas no coinciden" });

    const findUser = await User.findOne({ username });

    if (findUser) res.status(404).json({ message: "El usuario ya existe" });

    const newUser = new User({
      username,
      password,
    });

    const user = await newUser.save();

    const token = genToken(user.id);

    res.json({
      token,
      message: "Usuario creado correctamente",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signin = (req, res) => {};
