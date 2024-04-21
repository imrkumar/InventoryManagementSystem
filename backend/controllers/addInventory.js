const add = require('../models/inventory');
const generateQRCode = require('../config/genrateQr');

exports.addInventory = async (req, res) => {
       

        try {

            const data = {
                name: req.body.name,
                dateReceived: req.body.date,
                ReceivedQty: req.body.qty
            }
            const qrCodeData = JSON.stringify(data);
            const qrCode = await generateQRCode(qrCodeData);
             
            // Save the QR code path to the database
           
            await add.create({
                name: req.body.name,
                dateReceived: req.body.date,
                ReceivedQty: req.body.qty,
                qrCode:qrCode,
            });
    
            res.json({ success: true, qrCode });
        } catch (error) {
            console.error('Error generating and saving QR code:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }