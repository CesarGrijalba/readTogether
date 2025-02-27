import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import libroRoutes from "./routes/libroRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import prestamoRoutes from "./routes/prestamoRoutes.js"

dotenv.config();

//Vercel
import path from 'path';
import { fileURLToPath } from "url";

//Inicializando express
const app = express();
app.use(cors());
app.use(express.json());

//Definiendo el puerto
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;

// Configurar __dirname para ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Conectando a la base de datos
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((error) => {
    console.log("Error al conectar a la base de datos", error);
  });


  //Vercel
  app.use(express.static(path.join(__dirname, '../public')));

  app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });


//Rutas

app.use("/libros", libroRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/prestamos", prestamoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
