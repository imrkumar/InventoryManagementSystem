const data = require('../models/inventory');

exports.getData = async (req,res)=>{
    try {
            
        const response = await data.find();
        res.status(200).json(
              response
        );
}catch(err) {
    console.error(err);
    console.log(err);
    res.status(500)
    .json({
        success:false,
        data:"internal server error",
        message:err.message,
    })
}
}

exports.getDataById = async (req,res)=>{
    try {
        const id = req.params.id; 
        const response = await data.findById(id);
        res.status(200).json(
              response
        );
}catch(err) {
    console.error(err);
    console.log(err);
    res.status(500)
    .json({
        success:false,
        data:"internal server error",
        message:err.message,
    })
}
}


