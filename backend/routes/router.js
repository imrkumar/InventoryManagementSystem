const express = require('express');
const router = express.Router();

const {register} = require('../controllers/register.controller');
const {signin} = require('../controllers/signin');
const {addInventory}= require('../controllers/addInventory');
const {getData} = require('../controllers/getData');
const {deleteQr} = require('../controllers/deleteQr');
const {updateInventory} = require('../controllers/update');
const {getDataById} = require('../controllers/getData');
const {ReceivedUpdate}= require('../controllers/receivedUpdate');

router.post('/register',register);
router.post('/signin',signin);
router.post('/generate',addInventory);
router.get('/getdata',getData);
router.delete('/remove/:id',deleteQr);
router.put('/edit/:id',updateInventory);
router.get('/getdata/:id',getDataById);
router.put('/receivedupdate',ReceivedUpdate);


module.exports = router;