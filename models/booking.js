const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  nama: {
    type: String,
    required: true,
  },
  tglBooking: {
    type: Date,
    default: Date.now
  },
  layanan: {
    type: String,
    required: true,
  },  
  tglKonseling: {
    type: Date,
    required: true,
  },
  namaPsikolog: {
    type: String, 
    required: true,
  },
  harga: {
    type: String, 
    required: true,
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
