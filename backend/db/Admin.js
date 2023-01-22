const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let schema = new mongoose.Schema(
  {
    username: {
      type: mongoose.SchemaTypes.Email,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collation: { locale: "en" } }
);

// Password hashing
schema.pre("save", function (next) {
  let user = this;

  // if the data is not modified
  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

// Password verification upon login
schema.methods.adminlogin = function (password) {
  console.log("first")
  let user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        reject(err);
      }
      if (result) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

module.exports = mongoose.model("AdminAuth", schema);
