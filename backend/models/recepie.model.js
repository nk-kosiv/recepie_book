const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recepieSchema = new Schema({
  username: { type: String, required: true },
  recepie: { type: String, required: true },
  recepieName: { type: String, required: true },
}, {
  timestamps: true,
});

const Recepie = mongoose.model('Recepie', recepieSchema);

module.exports = Recepie;