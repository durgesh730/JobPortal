const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const shortid = require("shortid");

//create subscription order type
router.post("/orders",async (req,res) => {
    try {
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET
});
const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: crypto.randomBytes(10).toString("hex"),
};

instance.orders.create(options,(error,order) => {
    if(error){
        console.log(error);
        return res.status(500).json({message: "Somethine went wrong!"});
    }
    res.status(200).json({data:order});
});
    } catch (error){
console.log(error);
res.status(500).json({message: "Internl Server Error!"});
    }
});

//payment verfiy

router.post("/verify",async (req,res) => {
    try{
        const{
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256",proces.env.RAZORPAY_APT_SECRET)
            .update(sign.toString())
            .digest("hex");

            if(razorpay_signature === expectedSign){
                return res.status(200).json({message: "Payment verified successfully"});
            } else {
                return res.status(400).json({message: "Invalid signature sent!"});
            }
    } catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error!"});
    }
})

const razorpay = new Razorpay({
    key_id: "rzp_test_CTOrgdKPfdki05",
    key_secret: "lILEXKTxiX0Q1agqrFkCf35r",
});

router.get("/razorpay/:total/", async (req, res) => {
    const payment_capture = 1;
    const amount = req.params.total;
    const currency = "INR";

    const options = {
        amount: amount * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture,
    };
    try {
        const response = await razorpay.orders.create(options);
        // console.log(response);
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;

