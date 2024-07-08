// const chat = require("../models/chat");
const Pesan = require('../models/message');

const createMessage = async (req, res) => {
    const pesan = new Pesan({
      user: req.body.user,
      text: req.body.text,
    });
    try {
      const createMessage = await pesan.save();
      res.status(201).json({ createMessage, message: "Berhasil ditambahkan" });
    } catch (err) {
      res.status(400).json({ message: err.message, status: 400 });
    }
};


const getMassages = async (req, res) => {
    try {
      const pesan = await Pesan.find(
        {},
        { user: "$user", text: "$text" }
      );
      res.status(200).json(pesan);
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  };



module.exports = {createMessage, getMassages};