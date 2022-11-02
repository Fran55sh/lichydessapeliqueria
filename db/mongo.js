const mongoose = require('mongoose');

const conection = mongoose.connect('mongodb://localhost:27017/dbmongo',{useNewUrlParser : true,useUnifiedTopology: true},()=>{
    console.log('successfully connected to database');
});

module.exports = conection;