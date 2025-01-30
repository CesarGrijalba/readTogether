import express from "express";
import { obtenerPrestamos, crearPrestamo, obtenerTodos, obtenerSolicitudes, actualizarSolicitud} from "../controller/prestamoController.js";
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', authenticateJWT, obtenerPrestamos);
router.get('/solicitudes',authenticateJWT, obtenerSolicitudes);
router.put('/solicitudes/:id',actualizarSolicitud);
router.post('/', authenticateJWT, crearPrestamo);

export default router;
