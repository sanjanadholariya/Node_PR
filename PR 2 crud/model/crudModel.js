const mongoose = require('mongoose')

const crudSchema = mongoose.Schema({
  name :{
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  }
  
})



const crud = mongoose.model('crud',crudSchema)

module.exports = crud;