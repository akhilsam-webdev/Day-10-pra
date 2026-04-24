const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("connected to mongo Db")
    })
}

module.exports = connectToDb