
const register = require("../models/register");



exports.register = async(req,res) => {
    try {
            
            const {name,email,password} = req.body;
            //create a new Todo Obj and insert in DB
            const response = await register.create({name,email,password});
            //send a json response with a success flag
            res.status(200).json(
                {
                    success:true,
                    data:response,
                    message:'Entry Created Successfully'
                }
            );
    }
    catch(err) {
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