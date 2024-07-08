const userRoutes = require("express").Router();
const {
  getAllPsikolog,
  addPsikolog,
  psikolog,
  paketpsikolog,
  contact,
  dashboard,
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  reqError,
  login,
  ubahRoleUser,
  searchUser,
  reqPasswordReset,
  resetPassword,
} = require("../controller/userController");
const { verifyToken, verifyRole1 } = require("../middleware/auth");

userRoutes.post("/login", login);
// userRoutes.use((req, res, next) => {
//   const token = req.token;
// });

userRoutes.get("/psikolog", verifyToken, psikolog);
userRoutes.get("/paketpsikolog", verifyToken, paketpsikolog);
userRoutes.get("/contact", verifyToken, contact);
userRoutes.get("/dashboard", verifyToken,dashboard);
userRoutes.get("/users", getAllUsers);
userRoutes.get("/psikologs", getAllPsikolog);
userRoutes.get("/searchUser", verifyToken, verifyRole1, searchUser);
userRoutes.get("/users/:id", verifyToken, verifyRole1, getUserById);
userRoutes.post("/tambahUser", addUser);
userRoutes.post("/tambahPsikolog", addPsikolog);
userRoutes.delete("/hapusUser/:id", verifyToken, verifyRole1, deleteUser);
userRoutes.put("/ubahRoleUser/:id", verifyToken, verifyRole1, ubahRoleUser);
userRoutes.post("/req-reset-password", reqPasswordReset);
// userRoutes.use((req, res, next) => {
//   try {
//     req.link;
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// });
userRoutes.post("/change-password/:id/:token", resetPassword);
// userRoutes.use("/", reqError);

module.exports = userRoutes;
