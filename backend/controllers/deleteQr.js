const remove = require('../models/inventory');

exports.deleteQr = async (req,res)=>{
    try {
        const id = req.params.id;
        const response = await remove.findByIdAndDelete(id);
        res.status(200).json(
            response
        );
    }catch(err) {
        console.error(err);
        console.log(err);
    }
}