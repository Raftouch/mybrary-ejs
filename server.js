if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const port = process.env.PORT
const url = process.env.DATABASE_URL

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bookRouter = require('./routes/books')

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use(expressLayouts);
app.use(methodOverride('_method'))
app.use(express.static("public"));
app.use(express.urlencoded({ limit: '10mb', extended: false}))

const mongoose = require("mongoose");
mongoose.connect(url, {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to mongoose"));

app.use("/", indexRouter);
app.use("/authors", authorRouter)
app.use("/books", bookRouter)

app.listen(port, () => console.log(`App is listening on port ${port}`));
