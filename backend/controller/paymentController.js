const instance = require("../utils/razorpay");
const crypto = require("crypto");

const processPayment = async (req, res) => {
    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR"
    }
    const order = await instance.orders.create(options)
    res.status(200).json({
        success: true,
        order
    })

}

//send api key
const sendAPIKey = async (req, res) => {
    res.status(200).json({
        success: true,
        key: process.env.RAZORPAY_API_KEY,
    })

}
//payment verification
const paymentVerification = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        res.status(200).json({
            success: true,
            message: "Payment verified Successfully",
            reference:razorpay_payment_id
        })
    }
    else {
        res.status(200).json({
            success: true,
            message: "Payment verification failed"
        })
    }

}



module.exports = { processPayment, sendAPIKey, paymentVerification }