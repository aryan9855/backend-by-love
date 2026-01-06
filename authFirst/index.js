const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;

const cookiePaser = require("cookie-parser");
app.use(cookiePaser());
// Middleware
app.use(express.json());

// Database connect
require("./config/database").connect();

// Routes
const user = require("./routes/user");
app.use("/api/v1", user);

app.listen(PORT, () => {
    console.log(` App is running at ${PORT}`);
});
