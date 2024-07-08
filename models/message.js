const mongoose = require("mongoose");

const Pesan = mongoose.model("pesan", {
    user: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  });

module.exports = Pesan;