
const mongoose = require('mongoose');
 require('dotenv').config();

const dbConnect =()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{console.log("database connected successfully")})
    .catch((err)=> {console.log(err)
        process.exit(1);
    });
    
}

module.exports = dbConnect;