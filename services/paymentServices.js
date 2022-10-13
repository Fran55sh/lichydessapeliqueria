const config = require('../config')
const axios = require("axios");

/* It creates a payment object with the items passed as a parameter and returns the payment object. */
class PaymentService {
  async createPayment(items) {
    console.log(items)
    console.log(items[0].id)
    const url = "https://api.mercadopago.com/checkout/preferences";
    const body = {
      // payer_email: "test_user_93071437@testuser.com",
      items: items,
      back_urls: {
        failure: "/failure",
        pending: "/pending",
        success: `localhost:3000/cursos/add/${items[0].id}`
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