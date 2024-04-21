const user = require('../models/register');
const jwt = require('jsonwebtoken');
exports.signin = async (req,res)=>{
    const secretKey = 'your-secret-key';
    const generateToken = (user) => {
        const payload = {
          username: user
        };
      
        return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
      };
    try {
       
        const {email,password} = req.body;
        const response = await user.findOne({email});
        if(response){
            if(response.password === password){
                res.status(200).json(
                    {
                        success:true,
                        token:generateToken(response.name),
                        message:'login successful'
                    }
                );
            }else{
                res.status(200).json(
                    {
                        success:false,
                        message:'Incorrect Password'
                    }
                );
            }
        }else{
            res.status(200).json(
                {
                    success:false,
                    message:'User Not Found'
                }
            );
        }
    } catch (error) {
        res.status(500).json(
            {
                success:false,
                data:error,
                message:'Internal Server Error'
            }
        );
    }
}