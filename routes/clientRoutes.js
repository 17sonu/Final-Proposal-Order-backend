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

// GET route to fetch all clients
router.get("/getClients", async (req, res) => {
  try {
    const clients = await Client.find(); // Correctly fetch all records from the 'Client' collection
    if (clients.length === 0) {
      return res.status(404).json({ message: "No clients found" });
    }
     return res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ message: "Error fetching clients", error: error.message });
  }
});


// Export the router
module.exports = router;
