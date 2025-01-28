import mongoose from 'mongoose';

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
        type: String,
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
