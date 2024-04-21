const mongoose = require('mongoose');

const inventory = new mongoose.Schema(
    {
       name:{
        type:String,
       } ,
       dateReceived:{
        type:Date,
       },
       dateDispatched:{
        type:Date,
        default: null
       },
        ReceivedQty:{
        type:Number,
       },
        DispatchedQty:{
        type:Number,
        default: 0
       },
       status:{
        type:String,
        default: 'pending'
       },
       qrCode:{
        type:String
       }


    }
)
module.exports = mongoose.model('inventory', inventory);