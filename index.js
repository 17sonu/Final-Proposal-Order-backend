const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const userRoutes = require("./routes/auth");
const clientRoutes = require("./routes/clientRoutes");
const dotenv = require("dotenv");
dotenv.config();


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: "https://final-proposal-order-frontend.vercel.app",
    credentials: true,
}));
app.use(session({
    secret: "simplemernsecret", // Replace with a secure string in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true for HTTPS
}));


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));


// Use Routes
app.use("/api/auth", userRoutes);
app.use("/api/clients", clientRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
