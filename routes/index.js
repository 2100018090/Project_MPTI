const bookRoutes = require("express").Router();
const {
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
} = require("../controller/booksController");
const { verifyToken, verifyRole2 } = require("../middleware/auth");
// const {
//   createChat, 
//   findUserChats, 
//   findChat
// } = require("../controller/chatController");

bookRoutes.get("/booking",getAllSemuaBooking);
bookRoutes.get("/booking/:nama",getAllBooking);
bookRoutes.get("/books", verifyToken, getAllBooks);
bookRoutes.get("/booking/id/:id", verifyToken,getBookingById);
bookRoutes.get("/books/id/:id", verifyToken, getBookById);
bookRoutes.post("/books/tambah", addBooks);
bookRoutes.put("/books/ubah/:id", verifyToken, verifyRole2, updateBook);
bookRoutes.put("/booking/ubah/:id", verifyToken, verifyRole2, updateBooking);
bookRoutes.delete("/books/hapus/:id", verifyToken, verifyRole2, deleteBook);
bookRoutes.delete("/booking/hapus/:id",verifyToken, deleteBooking);
bookRoutes.get("/books/search", verifyToken, searchBook);

// bookRoutes.post("/addchat", createChat);
// bookRoutes.get("/:userId", findUserChats);
// bookRoutes.get("/find/:firstId/:secondId", findChat);

const { 
  createMessage, 
  getMassages
} = require("../controller/messageController");
bookRoutes.post("/addmessage", createMessage);
bookRoutes.get("/getMessages", getMassages);




// bookRoutes.get("/books/:id-:nama", (req, res) => {
//   res.send(req.params);
//   console.log(req.params);
// });
// bookRoutes.get("/books/:id.:nama", (req, res) => {
//   res.send(req.params);
//   console.log(req.params);
// });
bookRoutes.use("/", reqError);

module.exports = bookRoutes;
