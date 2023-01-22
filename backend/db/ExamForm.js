const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    // time: {
    //     type: Number,
    //     required: true,

    // }
  },

  { collection: "examForms" }
);

module.exports = mongoose.model("examForm", schema);
