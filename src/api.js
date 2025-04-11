require('dotenv').config();

const express = require('express');
const twilio = require('twilio');
const cors = require('cors');
const mongoose = require('mongoose');
const ACCOUNTSID = process.env.MY_ACCOUNT_SID;
const AUTHTOKEN = process.env.MY_AUTH_TOKEN;
const app = express();
const PORT = process.env.PORT || 5005;

const Customer_Order_model = require('./model/model')


mongoose.connect(process.env.MONGO_URL).then(() => console.log('MongoDB is connected....'))
        .catch(err => console.error('Some Error Occure in DB', err))

const clinetOrder = new twilio(ACCOUNTSID, AUTHTOKEN);

app.use(cors());
app.use(express.json());


app.post("/customerOrder", async (req, res) => {
        const { name, srname, address, pinCode, landmark, phone, id, imgs, productName, price } = req.body;


        try {
                const order = await Customer_Order_model.create({
                        name, srname, address, pinCode, landmark, phone, id, imgs, productName, price
                });
                if (!order) {
                        res.status(500).json({ success: false, message: 'Deu to Server isue Ordered Not Confermed Yet ' });
                } else {

                        const result = await clinetOrder.messages.create({
                                body: `Appna Bazaar Customer Details:- Name:${name}, Full-Address:${address} , PinCode:${pinCode}, Landmark:${landmark}, phone:${phone}, Product-Id:${id}, ProductName:${productName}, ProductPrice:${price}`
                                ,
                                from: '+18283731933',
                                to: '+919101942328'
                        })

                        console.log('Message SID:', result.sid);
                        if (result.sid) {

                                res.status(200).json({ success: true, message: 'Order Successfull!!' });
                        }

                }




        } catch (error) {

                console.error('Error sending SMS:', error.message);
                res.status(500).json({ success: false, message: 'Failed to send notification' });

        }
})




app.get("/", (req, res) => {
        console.log('Hello');
        res.write('Hello Sir');
})



app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}.....`));