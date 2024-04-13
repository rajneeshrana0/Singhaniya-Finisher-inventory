const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    partyname: {
      type: String,
      required: true,
    },
    challn: {
      type: String,
      required: true,
    },
    quality: {
      type: String,
      required: true,
    },
    kg: {
      type: Number,
      required: true,
    },
    meter: {
      type: Number,
      required: true,
    },
    roll: {
      type: Number,
      required: true,
    },
    description: String,
  },
);


const Product = mongoose.model("product", ProductSchema);
module.exports = Product;