/* It creates a payment link for a user to pay for a subscription */
class PaymentController {


   /**
    * The constructor function is a special function that is called when a new instance of the class is
    * created.
    * @param subscriptionService - This is the service that we are going to inject into our component.
    */
    constructor(subscriptionService) {
      this.subscriptionService = subscriptionService;
    }
  
   /**
    * It creates a payment link for a user to pay for a subscription.
    * </code>
    * @param req - The request object.
    * @param res - The response object.
    * @returns The payment link.
    */
    async getPaymentLink(req, res) {
      const {id, title, description, picture_url, unit_price} = req.body
      
      const items = [
        {
          id,
          title,
          description,
          picture_url,
          category_id: "Curso",
          quantity: 1,
          unit_price,
        }
        
      ]
      try {
        const payment = await this.subscriptionService.createPayment(items);
  
        return res.json(payment);
      } catch (error) {
        console.log(error);
  
        return res
          .status(500)
          .json({ error: true, msg: "Failed to create payment" });
      }
    }

  }
  
  module.exports = PaymentController;