const Payment=require('../models/payment');
async function makePayment(payment){
    try{
        const result = await Payment.create(payment);
        return result._id;
    }catch(error){
        console.error('Error Making Payment',error);
    }
}

module.exports={makePayment};
