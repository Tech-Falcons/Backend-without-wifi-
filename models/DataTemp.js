const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
  
    temp :{
        type:Number
    }

})
const DataTemp = mongoose.model('DataTemp', userSchema);
module.exports = DataTemp;