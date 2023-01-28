const mongoose = require("mongoose");
require("mongoose-type-email");


let schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    basicInfo : {
      name : {
        type : String ,
        required: true ,
      },
      title : {
        type : String ,
        required: true ,
      },
      email : {
        type : mongoose.SchemaTypes.Email ,
        required: true ,
      },
      mobile : {
        type : String ,
        required: true ,
      },
      description : {
        type : String ,
        required: true ,
      }
    },
    skills : [
      {
        skillHead : {
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
            type : Number , 
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
        exp : {
          type: Number,
          required: true,
        },
        desc : {
          type: String,
          required: true,
        }
      }
    ],
    recruiterlist:[
       {
        recruiterId:{
        type:String,
        required:true
       },
       mask:{
          type:Boolean,
          required:true,
          default:true
       },
       access:{
          type:Boolean,
          required:true,
          default:false
       }
      }
    ]
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("resume", schema);
