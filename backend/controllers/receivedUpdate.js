const update = require('../models/inventory');

exports.ReceivedUpdate = async (req, res) => {
   
      
    try {

          const  name= req.body.name;
          console.log(req.body.dateDispatched);
          console.log(req.body.name);
          console.log(req.body.ReceivedQty);
        // Save the QR code path to the database
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
          
          console.log(response)
        res.json({ success: true, response });
    } catch (error) {
        console.error('Error generating and saving QR code:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}
