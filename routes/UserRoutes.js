const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const userController = require("../controllers/userControllers");
const ensureAuth = require("../middlewares/auth");

router.get("/", (req, res) => {
  const error = req.flash("error")[0];
  console.log(error);
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

router.post("/signup", userController.signIn);

router.post(
  "/login",
  passport.authenticate("local", {
    session: false,
    failureRedirect: "/",
    failureFlash: true,
  }),
  userController.logIn
),
  router.get(
    "/logout",
    passport.authenticate("jwt", { session: false }),
    userController.logOut
  );

// router.get("/authenticated", passport.authenticate("jwt", { session: false }), ensureAuth);

// router.get("/profile", passport.authenticate("jwt", { session: false }), ensureAuth);

router.get("/users", userController.getUsers);

router.get("/users/cursos", userController.getUserCourses);

router.use("/api", router);

module.exports = router;
