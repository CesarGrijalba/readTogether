import express from 'express';
import {obtenerLibros, crearLibro, actualizarLibro, eliminarLibro} from '../controller/libroController.js';

const router = express.Router();

//Rutas
router.get('/', obtenerLibros);
router.post('/', crearLibro);
router.put('/:id', actualizarLibro);
router.delete('/:id', eliminarLibro);

export default router;