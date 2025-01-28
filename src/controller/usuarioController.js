import Usuario from "../models/usuario.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

//Cargar variables de entorno
dotenv.config();

//Funcion para registro de usuarios
export const registro = async (req, res) => {
  try {
    const usuario = req.body;
    const newUsuario = new Usuario(usuario);
    await newUsuario.save();

    const token = jwt.sign({ id: newUsuario._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    }); // genera un token JWT con el id del usuario y lo expira en 1 hora
    res.status(201).json({ message: "Usuario creado", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el usuario:", error: error.message });
  }
};

//Funcion para login de usuarios
export const login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const usuario = await Usuario.findOne({ email }); // Busca un usuario con el email proporcionado
    if (!usuario) {
      return res.status(400).json({ message: "Credenciales incorrectas" }); // Si no encuentra un usuario con ese email, devuelve un error
    }

    const match = await usuario.comparePassword(contraseña); // Compara la contraseña proporcionada con la contraseña encriptada del usuario
    if (!match)
      return res.status(401).json({ message: "Credenciales incorrectas" }); // Si las contraseñas no coinciden, devuelve un error

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    }); // genera un token JWT con el id del usuario y lo expira en 1 hora

    res.status(200).json({ message: "Usuario logueado", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al loguear el usuario:", error: error.message });
  }
};

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}