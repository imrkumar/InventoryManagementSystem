const update = require('../models/inventory');
const generateQRCode =require('../config/genrateQr');

exports.updateInventory = async (req, res) => {
   
    try {

        const data = {
            name: req.body.name,
            dateReceived: req.body.date,
            ReceivedQty: req.body.qty
        }
        const qrCodeData = JSON.stringify(data);
        const qrCode = await generateQRCode(qrCodeData);
         
        const updatedData = {
            name: req.body.name,
            dateReceived: req.body.date,
            ReceivedQty: req.body.qty,
            qrCode: qrCode
        }
        // Save the QR code path to the database
       const id = req.params.id;
         const response= await update.findByIdAndUpdate(id,updatedData, { new: true })

        res.json({ success: true, response });
    } catch (error) {
        console.error('Error generating and saving QR code:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}
