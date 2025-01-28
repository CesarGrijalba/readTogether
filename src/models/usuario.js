import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Importamos bcrypt para encriptar la contraseña

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
  },
  telefono: {
    type: String,
  },
  rol: {
    type: String,
    enum: ["usuario", "admin"],
    default: "usuario",
  },
});

// esta función se ejecuta antes de guardar un nuevo usuario
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("contraseña")) {
    return next();
  }
  this.contraseña = await bcrypt.hash(this.contraseña, 10);
});

usuarioSchema.methods.comparePassword = async function (contraseña) {
  return await bcrypt.compare(contraseña, this.contraseña);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
