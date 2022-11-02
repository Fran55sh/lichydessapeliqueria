const mongoose = require('mongoose');

const conection = mongoose.connect('mongodb://127.0.0.1:27017/dbmongo',{useNewUrlParser : true,useUnifiedTopology: true},()=>{
    console.log('successfully connected to database');
});

module.exports = conection;