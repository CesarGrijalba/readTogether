import express from "express";
import { obtenerPrestamos, crearPrestamo, obtenerTodos} from "../controller/prestamoController.js";
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', authenticateJWT, obtenerPrestamos);
router.post('/', authenticateJWT, crearPrestamo);

export default router;
