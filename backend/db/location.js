const mongoose = require("mongoose");
require("mongoose-type-email");


let schema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        centre_Name: {
            type: String,
            required: false,
            default: "Pending"
        },
        address: {
            type: String,
            required: false,
            default: "Pending"
        },
        phone_number: {
            type: Number,
            required: false,
            default: "Pending"
        },
        email: {
            type: mongoose.SchemaTypes.Email,
            required: false,
        }
    },

    { collection: "Location" },

);

module.exports = mongoose.model("Location", schema);
