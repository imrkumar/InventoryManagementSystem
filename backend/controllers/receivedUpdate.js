const update = require('../models/inventory');

exports.ReceivedUpdate = async (req, res) => {
   
      
    try {
          const  name= req.body.name;
        const response = await update.updateOne(
            { 
              name: name,                    
            },
            { 
              $set: { 
                dateDispatched: req.body.dateDispatched,
                DispatchedQty: req.body.ReceivedQty
               }             
            }
          );
          
        res.json({ success: true, response });
    } catch (error) {
        console.error('Error generating and saving QR code:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}
