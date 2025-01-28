import {registro, login, obtenerUsuarios} from '../controller/usuarioController.js';
import express from 'express';

const router = express.Router();

//Rutas
router.post('/registro', registro);
router.post('/login', login);
router.get('/', obtenerUsuarios);

export default router;  // Exportamos el router para poder usarlo en app.js
