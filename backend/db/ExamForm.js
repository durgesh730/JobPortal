const mongoose = require("mongoose");
require("mongoose-type-email");


let schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    // name: {
    //   type: String,
    //   required: true
    // },
    test_name: {
      type: String,
      required: true
    },
    test_dec: {
      type: String,
      required: false,
      default:"Pending"
    },
    location: {
      type: String,
      required: false,
      default:"Pending"
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    time: {
      type: String,
      required:false,
      default:"Pending"
    },
    attandance_confirm: {
      type: Boolean,
      required: false,
      default:false
    },
    status: {
      type: String,
      required: false,
      default:"Pending"
    },
    test_document: {
      type: String,
      required: false,
      default:"Pending"
    },
    address: {
      type: String,
      required: false,
      default:"Pending"
    },
    phone_number: {
      type: Number,
      required: false,
      default:"Pending"
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: false,
    }
    // score: {
    //   type: Number,
    //   required: false,
    //   default: 0
    // },
    // is_verified: {
    //   type: Boolean,
    //   required: false,
    //   default: false
    // },
  },
  { collection: "examForms" },
  // { typeKey: '$type' }
);

module.exports = mongoose.model("examForm", schema);
