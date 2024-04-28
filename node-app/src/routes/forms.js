const express = require("express");
const router = express.Router();
const Form = require("../models/Form");
const { isAuthenticated, getSummary } = require("../helpers");

// Client Router
router.get("/summary", isAuthenticated, async (req, res) => {
  const forms = await Form.find({ })
    .sort({ date: "desc" })
    .lean();

  let data = {};
  try {
    data = await getSummary();
  } catch (error) {
    console.error(error);
  }

  if (req.user.rol === "admin") {
    res.render("forms/all-forms", {
      forms,
      chartData: data,
      data: data.datasets[0].data,
    });
  } else {
    res.render("forms/info-covid", { forms });
  }
});

router.get("/forms/add", isAuthenticated, (req, res) => {
  res.render("forms/new-form");
});

router.get("/forms/info-covid", isAuthenticated, (req, res) => {
  res.render("forms/info-covid");
});

// Service Router
router.post("/forms/new", isAuthenticated, async (req, res) => {
  const errors = [];
  const {
    lugar,
    sintoma1,
    sintoma2,
    sintoma3,
    sintoma4,
    sintoma5,
    sintoma6,
    sintoma7,
    sintoma8,
    estaVacunado,
    cercacovid,
    prueba,
  } = req.body;

  // Validations
  if (!lugar || lugar === "Seleccione una opción") {
    errors.push({ text: "Porfavor seleccione un lugar" });
  }
  if (
    (!estaVacunado || estaVacunado === "Seleccione una opción") &&
    (!cercacovid || cercacovid === "Seleccione una opción") &&
    (!prueba || prueba === "Seleccione una opción")
  ) {
    errors.push({ text: "Porfavor seleccione una respuesta" });
  }
  if (errors.length > 0) {
    res.render("forms/new-form", {
      errors,
      lugar,
      sintoma1,
      sintoma2,
      sintoma3,
      sintoma4,
      sintoma5,
      sintoma6,
      sintoma7,
      sintoma8,
      estaVacunado,
      cercacovid,
      prueba,
    });
  } else {
    let newForm = new Form({
      lugar,
      sintoma1,
      sintoma2,
      sintoma3,
      sintoma4,
      sintoma5,
      sintoma6,
      sintoma7,
      sintoma8,
      estaVacunado,
      cercacovid,
      prueba,
    });
    newForm.user = req.user;

    try {
      await newForm.save();
      req.flash("success_msg", "Formulario registrado exitosamente.");
      res.redirect("/summary");
    } catch (error) {
      req.flash("error_msg", error.message);
      res.redirect("/");
    }
  }
});

router.delete("/forms/delete/:id", isAuthenticated, async (req, res) => {
  await Form.findByIdAndDelete(req.params.id).lean();
  req.flash("success_msg", "El formulario se ha eliminado exitosamente.");
  res.redirect("/summary");
});

module.exports = router;
