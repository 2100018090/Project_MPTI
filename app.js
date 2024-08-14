require("dotenv").config();
const app = require("express")();
const bookRoutes = require("./routes/index");
const userRoutes = require("./routes/userRoutes");
// const chatRoutes = require("./routes/chatRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 8080;

// dokumnetasi swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const options = require("./swagger");
const cookieParser = require("cookie-parser");
const specs = swaggerJsDoc(options);

require("./database");
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// menggunakan body-parser
app.use(bodyParser.json());
// app.use(express.json)
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(userRoutes);
app.use(bookRoutes);
// app.use(chatRoutes);s


const server = app.listen(port, () => {
  console.log(`app listen at http://localhost:${port}`);
});

module.exports = { app, server };
