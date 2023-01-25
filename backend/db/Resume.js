const mongoose = require("mongoose");
require("mongoose-type-email");


let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    basicInfo : {
      fullname : {
        type : String ,
        required: true ,
      },
      jobtitle : {
        type : String ,
        required: true ,
      },
      email : {
        type : mongoose.SchemaTypes.Email ,
        required: true ,
      },
      mobileNo : {
        type : String ,
        required: true ,
        validate: {
          validator: function (v) {
            return v !== "" ? /\+\d{1,3}\d{10}/.test(v) : true;
          },
          msg: "Phone number is invalid!",
        },
      },
      description : {
        type : String ,
        required: true ,
      }
    },
    skills : [
      {
        skill : {
          type : String,
          required : true ,
        }
      }
    ],
    education: [
        {
          university: {
            type: String,
            required: true,
          },
          degree : {
            type : String ,
            required: true ,
          },
          cgpa : {
            type : Boolean , 
            required : true ,
          }
      },
    ],
    expereince : [
      {
        company : {
          type: String,
          required: true,
        },
        designation : {
          type: String,
          required: true,
        },
        years : {
          type: Number,
          required: true,
        },
        description : {
          type: String,
          required: true,
        }
      }
    ]
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("resume", schema);
