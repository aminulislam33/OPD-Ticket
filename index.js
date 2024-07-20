require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const patientRouter = require('./routes/patient');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { checkAuth } = require('./service/auth');

const app = express();
const port = process.env.PORT;
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("MongoDB connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

app.use("/user", userRouter)
app.use("/patient", checkAuth, patientRouter)
app.get("/", checkAuth, (req,res)=>{return res.render("home")});

app.listen(port, ()=>{
    console.log(`server started on ${port}`);
});