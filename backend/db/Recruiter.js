const mongoose = require("mongoose");
const { defaults } = require("mongoose-type-email");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return v !== "" ? /\+\d{1,3}\d{10}/.test(v) : true;
        },
        msg: "Phone number is invalid!",
      },
    },
    bio: {
      type: String,
    },
    resumelist:[
      {
       resumeId:{
       type:String,
       required:true
       
      },
      mask:{
         type:Boolean,
         required:true,
         defaults:true
      }
     }
   ]

  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("RecruiterInfo", schema);
