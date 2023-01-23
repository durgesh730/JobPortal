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
    time: {
        type: String,
        required: true,
    },
    score:{
      type:Number,
      required:false,
      default:0
    },
    is_verified:{
      type:Boolean,
      required:false,
      default:false
    }

  },

  { collection: "examForms" }
);

module.exports = mongoose.model("examForm", schema);
