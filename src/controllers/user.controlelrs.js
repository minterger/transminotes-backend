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
  console.log(req.body);
  try {
    const findUser = await User.findOne({ username });

    if (findUser)
      return res.status(404).json({ message: "El usuario ya existe" });

    if (password !== confirm_password)
      return res.status(404).json({ message: "Las contraseñas no coinciden" });

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
    console.error(error);
  }
};

export const signin = async (req, res) => {
  const { username, password } = req.body;

  console.log(req.body);
  try {
    const user = await User.findOne({ username });

    if (!user)
      return res
        .status(404)
        .json({ message: "Usuario o Contraseña Incorrectos" });

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch)
      return res
        .status(404)
        .json({ message: "Usuario o Contraseña Incorrectas" });

    const token = genToken(user.id);

    res.json({
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error(error);
  }
};
