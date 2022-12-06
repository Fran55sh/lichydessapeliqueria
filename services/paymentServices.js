
const config = require('../config')
const axios = require("axios");


/* It creates a payment object with the items passed as a parameter and returns the payment object. */
class PaymentService {
  async createPayment(items, paymentMethods, userId) {
    const url = "https://api.mercadopago.com/checkout/preferences";
    console.log(`El usuario ${userId} compro el curso ${items.title}`)
    const body = {
      // payer_email: "test_user_93071437@testuser.com",
      items: items,
      payment_methods: paymentMethods,
    
      back_urls: {
        failure: "https://www.lichydessa.com",
        pending: "https://www.lichydessa.com",
        success: `https://www.lichydessa.com/api/cursos/add/${items[0].id}/${userId}`,
      }
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.access_token}`
      }
    });

    return payment.data;
  }

}

module.exports = PaymentService;
