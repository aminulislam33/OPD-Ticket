require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const patientRouter = require('./routes/patient');
const path = require('path');
const bodyParser = require('body-parser');
const twilioRouter = require('./routes/twilio-sms');
const session = require('express-session');
const {checkAuth} = require('./services/auth')

const app = express();

const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
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
  cookie: { secure: true } 
}));
app.use("/patient", patientRouter);
app.use('/twilio-sms', twilioRouter);


app.get("/", checkAuth, (req,res)=>{
  res.render("home");
});

app.get("/twilio-sms/send-otp", (req,res)=>{
  res.render("send-otp");
});

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});