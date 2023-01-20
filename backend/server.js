const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");
const cors = require("cors");
const fs = require("fs");
const Razorpay = require("razorpay");
const paymentRoutes = require("./routes/payment");
const dotenv = require("dotenv");

dotenv.config();


// MongoDB
mongoose
  .connect("mongodb://localhost:27017/jobPortal", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// initialising directories
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile");
}

const app = express();
const port = 4444;
//razorpay
//middlewares
app.use(express.json());
app.use(cors());

//routes razorpay
app.use("/api/payment/",paymentRoutes);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Setting up middlewares
app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());

// Routing
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/host", require("./routes/downloadRoutes"));


 const instance = new Razorpay({
  key_id: "rzp_live_pMbjbGIcXsozLN",
  key_secret: "2VxOhHN37vLogkp3izJFeyIo",
});

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
