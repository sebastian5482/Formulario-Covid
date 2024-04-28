const mongoose = require("mongoose");
const { Schema } = mongoose;

const FormSchema = new Schema({
  lugar: { type: String },

  sintoma1: { type: String },
  sintoma2: { type: String },
  sintoma3: { type: String },
  sintoma4: { type: String },
  sintoma5: { type: String },
  sintoma6: { type: String },
  sintoma7: { type: String },
  sintoma8: { type: String },

  estaVacunado: { type: String },
  cercacovid: { type: String },
  prueba: { type: String },

  user: { type: Object },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Form", FormSchema);
