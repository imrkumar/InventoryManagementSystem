const QRCode = require('qrcode');
const path = require('path');

async function generateQRCodeAndSave(data) {
    try {
        // Generate QR Code
        const filename = Date.now();
        const qrImageBuffer = await QRCode.toFile(path.join(__dirname,`../../public/qrcodes/${filename}.png`), data);

        return `qrcodes/${filename}.png`; // Return the path where the image is saved
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
}

module.exports = generateQRCodeAndSave;
