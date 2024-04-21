const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());

require('dotenv').config();
const bodyParser = require('body-parser');

const routes = require('./routes/router');
const port = process.env.PORT ||9080;

//middleware

app.use(bodyParser.json());


app.use('/',routes);

const dbConnect = require('./config/database');
dbConnect();
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`Server is running on port ${port}`);
    }
})
