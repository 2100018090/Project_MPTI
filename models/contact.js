const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  telp: {
    type: String,
    required: true,
  },
});

const getContacts = async (req, res) => {
    try {
      const contacts = await Contact.find(
        {},
        { email: "$email", telp: "$telp" }
      );
      res.status(200).json(contacts);
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  };
  

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;
