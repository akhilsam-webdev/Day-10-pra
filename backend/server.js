require("dotenv").config();
const app = require("./src/app");
const connectToDb = require("./src/config/database");

// --- ADD THE LOG HERE ---
console.log("Database URL Key:", "DB_URL"); // Use the name you put in Render
console.log("Does it exist?", !!process.env.DB_URL);
// ------------------------

connectToDb();
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`server is running on port ${port}`);
});