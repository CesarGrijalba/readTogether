import mongoose from 'mongoose';
import Usuario from './usuario.js';

const LibroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    propietario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    fechaPublicacion: {
        type: Date,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    disponible: {
        type: Boolean,
        default: true
    },
    prestatario: {
        type: String,
        default: null
    },
    fechaPrestamo: {
        type: Date,
        default: null
    },
    fechaDevolucion: {
        type: Date,
        default: null
    }
});

const Libro = mongoose.model('Libro', LibroSchema);

export default Libro;
