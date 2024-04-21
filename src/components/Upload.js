import React, { useRef, useState,useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import jsQR from 'jsqr';
import './upload.css';
import axios from 'axios'; 

const QRCodeReader = () => {
    const [fileSelected, setFileSelected] = useState(false)
  const fileInputRef = useRef(null);
  const [qrCodeData, setQRCodeData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileUpload = () => {
    const file = fileInputRef.current.files[0];
    if (!file) {
      setErrorMessage('Please select a file.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target.result;

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setQRCodeData(code.data);
          setErrorMessage(null);
          console.log('QR Code data:', code.data);
          setFileSelected(true);
        } else {
          setErrorMessage('No QR code found in the image.');
        }
      };
    };

    reader.readAsDataURL(file);
    if(file){
        return <Navigate to="/dashboard" replace={true} />
    }
  };

  function updateData(){
    const parsedData = JSON.parse(qrCodeData);
    const {dateReceived,ReceivedQty,name} = parsedData;

    const dataToUpdate = {
        name:name,
        dateDispatched: dateReceived,
        ReceivedQty:  ReceivedQty
      };
    axios({
        method: 'PUT',
        url: 'http://localhost:9090/receivedupdate',
        data: dataToUpdate
      })
     .then(response => {
      console.log('Update successful:', response.data);
    })
    .catch(error => {
      console.error('Error updating data:', error);
    })
   
  }
  
  useEffect(() => {
    if (qrCodeData) {
      updateData();
    }
    
  },[qrCodeData])

  if(fileSelected){
    return <Navigate to="/dashboard" replace={true} />
  }

  return (
    <div className='Container'>
       
       <div className='subContainer'>
       <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} />
       </div>
      {errorMessage && <p>{errorMessage}</p>}
      {/* {qrCodeData && <p>QR Code data: </p>} */}
    </div>
  );
};

export default QRCodeReader;
