import express from 'express';
import {obtenerLibros, crearLibro, actualizarLibro, eliminarLibro, obtenerLibrosUser, 
    obtenerLibrosExplorar, obtenerLibro} from '../controller/libroController.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

//Rutas
router.get('/', obtenerLibros);
router.get('/misLibros', authenticateJWT, obtenerLibrosUser);
router.get('/explorar', authenticateJWT, obtenerLibrosExplorar);
router.get('/:id', obtenerLibro);
router.post('/', authenticateJWT, crearLibro);
router.put('/:id', actualizarLibro);
router.delete('/:id', eliminarLibro);

export default router;