// /routes/clientRoutes.js
const express = require("express");
const router = express.Router();
const Client = require("../models/client");

// POST route to add a new client
router.post("/", async (req, res) => {
  const { name, email, phone, address, gstNo } = req.body;

  try {
    const newClient = new Client({ name, email, phone, address, gstNo });
    await newClient.save();
    res.status(201).json({ message: "Client added successfully", client: newClient });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error adding client" });
  }
});

// Export the router
module.exports = router;