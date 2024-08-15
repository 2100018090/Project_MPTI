const Book = require("../models/booking");
const Contact = require("../models/contact");
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// Fungsi untuk mendapatkan semua kontak
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}, { email: 1, telp: 1 });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

// Fungsi untuk mendapatkan kontak berdasarkan ID
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id });
    if (!contact) {
      throw new Error("id not found");
    }
    res.status(200).json({
      contact,
      message: "Kontak ditemukan",
    });
  } catch (err) {
    res.status(404).json({
      message: "id not found",
    });
  }
};

// Fungsi untuk menambahkan kontak baru
const createContact = async (req, res) => {
  const contact = new Contact({
    email: req.body.email,
    telp: req.body.telp,
  });

  try {
    const savedContact = await contact.save();
    res.status(201).json({ savedContact, message: "Kontak berhasil ditambahkan" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Fungsi untuk mengedit kontak yang sudah ada
const updateContact = async (req, res) => {
  const { id } = req.params;
  const { email, telp } = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { email, telp },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Kontak tidak ditemukan" });
    }

    res.status(200).json({ updatedContact, message: "Kontak berhasil diperbarui" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Fungsi untuk menghapus kontak
const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: "Kontak tidak ditemukan" });
    }

    res.status(200).json({ message: "Kontak berhasil dihapus" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const getAllBooks = async (req, res) => {
  try {
    // const currentPage = parseInt(req.query.page) || 1;
    // const perPage = parseInt(req.query.perPage) || 2;
    // const booksPerPage = await Book.find()
    //   .skip((currentPage - 1) * perPage)
    //   .limit(perPage);
    const books = await Book.find({ nama: req.params.nama });
    res.status(200).json({ books });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const getAllSemuaBooking = async (req, res) => {
  try {
    // const currentPage = parseInt(req.query.page) || 1;
    // const perPage = parseInt(req.query.perPage) || 2;
    // const booksPerPage = await Book.find()
    //   .skip((currentPage - 1) * perPage)
    //   .limit(perPage);
    const booking = await Book.find();
    res.status(200).json({ booking });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const getAllBooking = async (req, res) => {
  try {
    // const currentPage = parseInt(req.query.page) || 1;
    // const perPage = parseInt(req.query.perPage) || 2;
    // const booksPerPage = await Book.find()
    //   .skip((currentPage - 1) * perPage)
    //   .limit(perPage);
    const booking = await Book.find({ nama: req.params.nama });
    res.status(200).json({ booking });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Book.findOne({ _id: req.params.id });
    if (!booking) {
      throw new Error("id not found");
    }
    res.status(200).json({
      booking,
      message: "booking ditemukan",
    });
  } catch (err) {
    res.status(404).json({
      // message: err.message,
      message: "id not found",
    });
  }
};

const updateBooking = async (req, res) => {
  try {
    // console.log(req.params);
    const booking = await Book.findOne({ _id: req.params.id });
    if (!booking) {
      throw new Error("id not found");
    }
    const duplikat = await Book.findOne({ nama: req.body.nama });
    if (booking.nama !== req.body.nama && duplikat) {
      throw new Error("Nama Pengguna Sudah Ada");
    }
    const bookingUpdated = await Book.updateOne(
      { _id: req.params.id },
      {
        $set: {
          nama: req.body.nama,
          tglBooking: req.body.tglBooking,
          layanan: req.body.layanan,
          tglKonseling: req.body.tglKonseling,
          namaPsikolog: req.body.namaPsikolog,
        },
      }
    );
    res
      .status(200)
      .json({ bookingUpdated, message: "Data Pengguna Berhasil di ubah" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const delBooking = await Book.deleteOne({ _id: req.params.id });
    res.status(200).json(delBooking);
  } catch (err) {
    // res.status(404).json({message: err.message})
    res.status(404).json({ message: "id not found" });
  }
};

const searchBooking = async (req, res) => {
  try {
    if (!req.query.nama) {
      return res.status(400).json({ message: "Wrong Query", status: 400 });
    }
    const result = await Book.find({
      nama: { $regex: req.query.nama, $options: "i" },
    });
    // if (result.length === 0) {
    //   throw new Error("nama buku tidak ada");
    // }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const searchBook = async (req, res) => {
  try {
    if (!req.query.namaBuku) {
      return res.status(400).json({ message: "Wrong Query", status: 400 });
    }
    const result = await Book.find({
      namaBuku: { $regex: req.query.namaBuku, $options: "i" },
    });
    // if (result.length === 0) {
    //   throw new Error("nama buku tidak ada");
    // }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });
    if (!book) {
      throw new Error("id not found");
    }
    res.status(200).json({
      book,
      message: "buku ditemukan",
    });
  } catch (err) {
    res.status(404).json({
      // message: err.message,
      message: "id not found",
    });
  }
};

const addBooks = async (req, res) => {
  const { nama, namaPsikolog, tglBooking, layanan, tglKonseling, harga, userEmail, psikologEmail } = req.body;

  try {
    // Buat objek booking baru, termasuk menyimpan email pengguna dan psikolog
    const newBook = new Book({
      nama,
      namaPsikolog,
      tglBooking,
      layanan,
      tglKonseling,
      harga,
      userEmail, // Menyimpan email pengguna
      psikologEmail, // Menyimpan email psikolog
    });

    // Simpan booking ke database
    const addBook = await newBook.save();

    // Atur konfigurasi transporter untuk Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nurwahyuuningtiasih@gmail.com', // Gunakan environment variable
        pass: 'nodw xbxe poga woma', // Gunakan environment variable
      },
    });

    // Konfigurasi email yang akan dikirim ke pengguna yang sedang login
    const userMailOptions = {
      from: 'nurwahyuuningtiasih@gmail.com',
      to: userEmail, // Email pengguna yang sedang login
      subject: 'Konfirmasi Booking Konseling',
      text: `Halo ${nama},\n\nBooking kamu dengan Psikolog ${namaPsikolog} pada tanggal ${tglKonseling} telah berhasil.\n\nTerima kasih telah menggunakan layanan kami.\n\nSalam,\nTim Konseling`,
    };

    // Konfigurasi email yang akan dikirim ke psikolog berdasarkan paket
    const psikologMailOptions = {
      from: 'nurwahyuuningtiasih@gmail.com',
      to: psikologEmail, // Email psikolog berdasarkan paket yang dipilih
      subject: 'Booking Baru untuk Konseling',
      text: `Halo ${namaPsikolog},\n\nAda booking baru untuk layanan konseling pada tanggal ${tglKonseling}.\n\nDetail Booking:\n- Nama Klien: ${nama}\n- Layanan: ${layanan}\n- Harga: ${harga}\n\nSilakan persiapkan konseling.\n\nSalam,\nTim Konseling`,
    };

    // Kirim email ke pengguna dan psikolog
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(psikologMailOptions);

    res.status(201).json({ addBook, message: 'Berhasil Booking dan email telah dikirim ke kedua penerima' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// const addBooks = async (req, res) => {
//   const { nama, namaPsikolog, tglBooking, layanan, tglKonseling, harga } = req.body;

//   try {
//     // Buat objek buku baru
//     const newBook = new Book({
//       nama,
//       namaPsikolog, // Menyimpan nama psikolog langsung
//       tglBooking,
//       layanan,
//       tglKonseling,
//       harga,
//     });

//     // Simpan buku ke database
//     const addBook = await newBook.save();

//     res.status(201).json({ addBook, message: 'Berhasil Booking' });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };


const updateBook = async (req, res) => {
  try {
    // console.log(req.params);
    const book = await Book.findOne({ _id: req.params.id });
    if (!book) {
      throw new Error("id not found");
    }
    const duplikat = await Book.findOne({ namaBuku: req.body.namaBuku });
    if (book.namaBuku !== req.body.namaBuku && duplikat) {
      throw new Error("nama buku sudah ada");
    }
    const bookUpdated = await Book.updateOne(
      { _id: req.params.id },
      {
        $set: {
          namaBuku: req.body.namaBuku,
          penerbit: req.body.penerbit,
          pengarang: req.body.pengarang,
          tahunTerbit: req.body.tahunTerbit,
          tempatTerbit: req.body.tempatTerbit,
        },
      }
    );
    res
      .status(200)
      .json({ bookUpdated, message: "Data Buku Berhasil Di Ubah" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const delBook = await Book.deleteOne({ _id: req.params.id });
    res.status(200).json(delBook);
  } catch (err) {
    // res.status(404).json({message: err.message})
    res.status(404).json({ message: "id not found" });
  }
};

// const booksPagination = (req, res) => {
//   try {
//     const page = req.query.page || 1;
//     const perPage = req.query.perpage || 10;

//   } catch (error) {
//     res.status(400).json({ message: err.message });
//   }
// };

const reqError = (req, res) => {
  res
    .status(400)
    .json({ status: 400, message: "cannot request with this end point" });
};

module.exports = {
  getContactById,
  getContacts, 
  createContact, 
  updateContact, 
  deleteContact,
  searchBooking,
  getAllSemuaBooking,
  deleteBooking,
  updateBooking,
  getBookingById,
  getAllBooking,
  getAllBooks,
  addBooks,
  getBookById,
  updateBook,
  deleteBook,
  reqError,
  searchBook,
};
