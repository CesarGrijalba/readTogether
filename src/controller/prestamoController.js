import express from "express";
import Prestamo from "../models/prestamo.js";

const router = express.Router();

export const obtenerPrestamos = async (req, res) => {
  try {
    const userId = req.userId;
    const prestamos = await Prestamo.find({ solicitante: userId });
    res.status(200).json(prestamos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerSolicitudes = async (req, res) => {
  try {
    const userId = req.userId;
    const solicitudes = await Prestamo.find({ propietario: userId });
    res.status(200).json(solicitudes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarSolicitud = async (req, res) =>{
  try {
    const updatedSolicitud = await Prestamo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedSolicitud);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const obtenerTodos = async (req, res) => {
  try {
    const userId = req.userId;
    const prestamos = await Prestamo.find();
    res.status(200).json(prestamos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const crearPrestamo = async (req, res) => {
  try {
    const { libro, propietario } = req.body;
    const solicitanteId = req.userId;
    const newPrestamo = new Prestamo({
      libro,
      solicitante: solicitanteId,
      propietario,
    });
    await newPrestamo.save();
    res.status(201).json(newPrestamo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default router;
