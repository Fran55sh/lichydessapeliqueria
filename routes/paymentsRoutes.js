
const express = require("express");
const router = express.Router();

const PaymentController = require("../controllers/paymentControllers");
const PaymentService = require("../services/paymentServices");

const PaymentInstance = new PaymentController(new PaymentService());


router.post("/payment", function (req, res, next) {
  PaymentInstance.getPaymentLink(req, res);
});


module.exports = router;