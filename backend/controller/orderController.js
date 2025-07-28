const { User } = require("../modals/userModel");
const { Product } = require("../modals/productModel");
const { Order } = require("../modals/orderModels");


//create new order
const createNewOrder = async (req, res) => {
    const { shippingInfo, orderItems, paymentInfo, itemPrice,
        taxPrice, shippingPrice, totalprice } = req.body;


    const order = await Order.create({
        shippingInfo, orderItems, paymentInfo, itemPrice,
        taxPrice, shippingPrice, totalprice, paidAt: Date.now(), user: req.user._id
    });


    res.status(200).json({
        success: true,
        order
    })
}
//get single order
const getSingleOrder = async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        res.status.json({
            success: false,
            message: "No order found"
        })
    }

    res.status(200).json({
        success: true,
        order
    })
}

module.exports = { createNewOrder, getSingleOrder };