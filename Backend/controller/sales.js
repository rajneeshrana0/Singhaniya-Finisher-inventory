const Sales = require("../models/sales");
const soldStock = require("../controller/soldStock");
const Purchase = require("../models/purchase");

// Add Sales
const addSales = async (req, res) => {
  try {
    const { lotNumber } = req.body;
    const userId = req.user.userId;

    const purchaseData = await Purchase.findOne({ lotNumber });
    console.log(purchaseData);

    if (!purchaseData) {
      return res
        .status(404)
        .json({ message: "Purchase data not found for the given lot number" });
    }

    // Get current date and time
    const currentDate = new Date();

    const newSales = new Sales({
      userID: userId,
      lotNumber: lotNumber,
      selectedOption: purchaseData.selectedOption,
      challanNumber: purchaseData.challanNumber,
      quantity: purchaseData.quantity,
      kg: purchaseData.kg,
      meter: purchaseData.meter,
      roll: purchaseData.roll,
      processTypes: purchaseData.processTypes,
      completionDate: currentDate, 
    });

    const savedSales = await newSales.save();

    res.status(201).json(savedSales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


const getSubmittedData = async (req, res) => {
  try {
    // Fetch all submitted sales data
    const submittedData = await Sales.find();

    res.status(200).json(submittedData);
  } catch (error) {
    console.error("Error fetching submitted data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addSales, getSubmittedData };
