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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        default: null
    },
    fechaPrestamo: {
        type: Date,
        default: null
    },
    fechaDevolucion: {
        type: Date,
        default: null
    },
    imagen: {
        type: String,
        default: 'default.jpg'
    }
});

const Libro = mongoose.model('Libro', LibroSchema);

export default Libro;
