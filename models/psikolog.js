const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Psikolog = mongoose.model("Psikolog", {
    nama: {
      type: String,
      required: true,
    },
  });
  module.exports = Psikolog;
