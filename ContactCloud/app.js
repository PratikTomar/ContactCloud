const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const contacts = require("./routes/contactsRoute");
const notFound = require("./Middleware/notFound");
dotenv.config();

// Middleware

app.use(express.json()); // using express.json() middleware to save data in json form when we are making POST request
app.use(express.static("./public")); // using express.static middleware to serve static files like html, css

app.use("/contacts", contacts); // using this middleware to append /contact in Route URL
app.use(notFound); // using this middleware when route not found

// Defining PORT
const port = process.env.PORT || 3000;

mongoose.connect(
  process.env.MONGODB_URI || "",
  {},
);

mongoose.connection.on("open", () => {
  console.log(`DB connected !`);
});

app.listen(port, () => {
  console.log(`Server running @ port ${port} !`);
});