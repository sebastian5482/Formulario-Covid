const Form = require("../models/Form");

module.exports = {
  getSummary: async () => {
    try {
      const sintomasOneCount = await Form.find({
        sintoma1: { $exists: true },
      }).count();
      const sintomasTwoCount = await Form.find({
        sintoma2: { $exists: true },
      }).count();
      const sintomasThreeCount = await Form.find({
        sintoma3: { $exists: true },
      }).count();
      const sintomasFourCount = await Form.find({
        sintoma4: { $exists: true },
      }).count();
      const sintomasFiveCount = await Form.find({
        sintoma5: { $exists: true },
      }).count();
      const sintomasSixCount = await Form.find({
        sintoma6: { $exists: true },
      }).count();
      const sintomasSevenCount = await Form.find({
        sintoma7: { $exists: true },
      }).count();
      const sintomasEightCount = await Form.find({
        sintoma8: { $exists: true },
      }).count();

      return Promise.resolve({
        labels: [
          "Sintoma 1",
          "Sintoma 2",
          "Sintoma 3",
          "Sintoma 4",
          "Sintoma 5",
          "Sintoma 6",
          "Sintoma 7",
          "Sintoma 8",
        ],
        datasets: [
          {
            label: "Cantidad de sintomas",
            data: [
              sintomasOneCount,
              sintomasTwoCount,
              sintomasThreeCount,
              sintomasFourCount,
              sintomasFiveCount,
              sintomasSixCount,
              sintomasSevenCount,
              sintomasEightCount,
            ],
            backgroundColor: [
              "#006666",
              "#009966",
              "#336666",
              "#339966",
              "#333333",
              "#003333",
              "#0099FF",
              "#663333",
            ],
          },
        ],
      });
    } catch (error) {
      return Promise.reject({
        message: "Hubo un error al obtener los síntomas",
        stack: new Error().stack,
      });
    }
  },
};
