// now here i am gonna create the schema of Project
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Book = new Schema({
    name:{
        type:String
    },
    price:{
        type:String
    },
    description:{
        type:String
    }
},
{
    collection:'books'
})
//dont forget to export module...
module.exports = mongoose.model('Book', Book)