import express from "express";
import Libro from "../models/libro.js";

const router = express.Router();

export const obtenerLibros = async (req, res) => {
  try {
    const libros = await Libro.find();
    res.status(200).json(libros);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const crearLibro = async (req, res) => {
  try {
    const libro = req.body;
    const newLibro = new Libro(libro);
    await newLibro.save();
    res.status(201).json(newLibro);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarLibro = async (req, res) => {
  try {
    const updatedLibro = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedLibro);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminarLibro = async (req, res) => {
  try {
    await Libro.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Libro eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default router;
