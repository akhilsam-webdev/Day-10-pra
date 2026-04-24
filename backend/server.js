require("dotenv").config()
const app = require("./src/app")
const connectToDb = require("./src/config/database")

// --- ADD THE LOG HERE ---
console.log("Database URL Key:", "MONGO_URI"); // Use the name you put in Render
console.log("Does it exist?", !!process.env.MONGO_URI); 
// ------------------------

connectToDb()
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})