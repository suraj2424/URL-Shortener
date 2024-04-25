const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");
const { ConnectMongoDB } = require("./connect");
const PORT = 8001;

const urlRoute = require("./routes/url");
const staticRoutes = require("./routes/staticRoutes");
const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser());


ConnectMongoDB("mongodb://localhost:27017/short-url").then(() => console.log("MongoDB Connected"));

app.set("view engine", "ejs");

app.set("views", path.resolve("./views"))

app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user", userRoutes);
app.use("/", checkAuth,staticRoutes);

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));