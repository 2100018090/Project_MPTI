const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  namaPsikolog: {
    type: String,
    required: true,
  },
  tglBooking: {
    type: Date,
    required: true,
  },
  layanan: {
    type: String,
    required: true,
  },
  tglKonseling: {
    type: Date,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  psikologEmail: {
    type: String,
    required: true,
  },
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;

