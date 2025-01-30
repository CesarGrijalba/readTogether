import mongoose from "mongoose";

// Modelo Préstamo
const prestamoSchema = new mongoose.Schema({
  libro: { type: mongoose.Schema.Types.ObjectId, ref: "Libro", required: true }, // Libro prestado
  solicitante: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true }, // Usuario que solicita el préstamo
  propietario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true }, // Usuario propietario del libro
  fechaSolicitud: { type: Date, default: Date.now }, // Fecha de solicitud
  fechaAprobacion: { type: Date }, // Fecha de aprobación
  fechaDevolucion: { type: Date }, // Fecha de devolución
  estado: { type: String, enum: ["pendiente", "aprobado", "rechazado", "devuelto"], default: "pendiente" }, // Estado del préstamo
});

const Prestamo = mongoose.model("Prestamo", prestamoSchema);

export default Prestamo;