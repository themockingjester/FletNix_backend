const express = require("express");
const cors = require('cors')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const cookieSession = require("cookie-session")
const app = express();
// cookie session for panels
// app.set('trust proxy', true) // trust first proxy
app.use(cookieSession({
    name: 'session',
    keys: ['dsfdsfdf23df'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    path: "/",
    sameSite: "none",
}))
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(
    cors({
        origin: [
            "http://localhost:4200",
        ],
        methods: ["POST", "PUT", "GET", "DELETE"],
        credentials: true,
        preflightContinue: false
    }),
);
const port = process.env.PORT || 4050;
app.use("/apis", require("./routes"));

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
