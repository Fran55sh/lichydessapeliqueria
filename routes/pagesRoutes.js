const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
  const error = req.flash("error")[0];
  res.render("index", {
    error,
  });
});

router.get("/misCursos", (req, res) => {
  res.render("misCursos");
});

router.get("/contacto", (req, res) => {
  res.render("contacto");
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

module.exports = router;
