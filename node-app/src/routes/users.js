const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");

router.get("/users/signin", (req, res) => {
  res.render("users/signin");
});

router.post(
  "/users/signin",
  passport.authenticate("local", {
    successRedirect: "/forms/info-covid",
    failureRedirect: "/users/signin",
    failureFlash: true,
  })
);

router.get("/users/signup", (req, res) => {
  res.render("users/signup");
});

router.post("/users/signup", async (req, res) => {
  const { name, email, password, confirm_password, rol } = req.body;
  const errors = [];
  // console.log(req.body)
  if (name.length <= 0) {
    errors.push({ text: "Porfavor Ingrse Su Nombre" });
  }
  if (password !== confirm_password) {
    errors.push({ text: "Las Contraseñas No Coinciden" });
  }
  if (rol.length <= 0) {
    errors.push({ text: "Seleccione un rol" });
  }
  if (password.length < 4) {
    errors.push({ text: "La Contraseña Debe Tener Minimo 4 Caracteres" });
  }

  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
      rol,
    });
  } else {
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      console.log("Se ha generado un error en el correo");
      req.flash("error_msg", "Se ha generado un error en el correo");
      res.redirect("/users/signup");
    } else {
      const newUser = new User({ name, email, password, rol });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Esta Registrado");
      res.redirect("/users/signin");
    }
  }
});

router.get("/users/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
