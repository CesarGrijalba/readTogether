import express from "express";
import { obtenerPrestamos, crearPrestamo, obtenerTodos, obtenerSolicitudes} from "../controller/prestamoController.js";
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', authenticateJWT, obtenerPrestamos);
router.get('/solicitudes',authenticateJWT, obtenerSolicitudes);
router.post('/', authenticateJWT, crearPrestamo);

export default router;
