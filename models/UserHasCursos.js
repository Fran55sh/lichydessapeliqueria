const mongoose = require('mongoose');
const Cursos = require('./Cursos')
const User = require('./User')

const UserHasCursosSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Types.ObjectId, 
        ref: "User"
    },
    cursoId:{
        type: mongoose.Types.ObjectId, 
        ref: "Cursos"
    },
    createdAt:{
        type: Date, 
        default: Date.now,
        // expires: 180
    }


})
UserHasCursosSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60*60*24*15 });
module.exports = mongoose.model('UserHasCursos',UserHasCursosSchema);