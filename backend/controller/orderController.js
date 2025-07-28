const { User } = require("../modals/userModel");
const { Product } = require("../modals/productModel");
const { Order } = require("../modals/orderModels");


//create new order(admin)
const createNewOrder = async (req, res) => {
    const { shippingInfo, orderItems, paymentInfo, itemPrice,
        taxPrice, shippingPrice, totalPrice } = req.body;


    const order = await Order.create({
        shippingInfo, orderItems, paymentInfo, itemPrice,
        taxPrice, shippingPrice, totalPrice, paidAt: Date.now(), user: req.user._id
    });


    res.status(200).json({
        success: true,
        order
    })
}
//get single order(admin)
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

//All my orders(user want to see their order)
const allMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    if (!orders) {
        res.status(404).json({
            success: false,
            message: "No order found"
        })
    }
    res.status(200).json({
        success: true,
        orders
    })
}

//All orders(admin)
const getAllOrders=async(req,res)=>{

    const orders=await Order.find();
    let totalAmount=0;
    orders.forEach(order=>{
        totalAmount+=order.totalPrice;
    })


     if (!orders) {
        res.status(404).json({
            success: false,
            message: "No order found"
        })
    }

    res.status(200).json({
          success:true,
          orders,
          totalAmount
    })
}

//update order status
const updateOrderStatus=async(req,res)=>{
       const order=await Order.findById(req.params.id);
       if (!order) {
        res.status(404).json({
            success: false,
            message: "No order found"
        })
    }
    if(order.orderStatus==="Delivered"){
        res.status(404).json({
            success: true,
            message: "The order is already delivered"
        })
    }
}

module.exports = { createNewOrder, getSingleOrder,allMyOrders,getAllOrders};