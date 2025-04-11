const mongoose = require('mongoose');

const CustomerOrderDetails = new mongoose.Schema({

        name: { type: String, required: true },
        srname: { type: String, required: true },
        address: { type: String, required: true },
        pinCode: { type: String, required: true },
        landmark: { type: String, required: true },
        phone: { type: String, required: true },
        id: { type: String, required: true },
        imgs: { type: String, required: true },
        productName: { type: String, required: true },
        price: { type: String, required: true },

}, { timestamps: true });

const Customer_Order_model = mongoose.model("CustomerOrder", CustomerOrderDetails);


module.exports = Customer_Order_model;