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
            // min: 1930,
        //   max: new Date().getFullYear(),
        //   required: true,
        //   validate: Number.isInteger,
        },
        // time: {
        //     type: Number,
        //     required: true,
            
        // }
    }
);

module.exports = mongoose.model("examForm",schema)