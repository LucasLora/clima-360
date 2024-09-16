const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  routines: [{
    location: { type: String, required: true },
    time: { type: String, required: true }, // Horário da rotina (formato HH:MM)
  }],
});

const Routine = mongoose.model('Routine', routineSchema);

module.exports = Routine;
