const mongoose = require('mongoose');

const CursoSchema = new mongoose.Schema({
    nombre :{
        type : String,
        required : true,
    },
    descripcion : {
        type : String,
    },
    filePath : {
        type : String,
        required: true
    },
    precio:{
        type:Number,
        required: true
    }

});

module.exports = mongoose.model('Cursos',CursoSchema);