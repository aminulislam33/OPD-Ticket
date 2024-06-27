require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const patientRouter = require('./routes/patient');
const path = require('path');

const app = express();

const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use("/patient", patientRouter);
app.get("/", (req,res)=>{
  res.render("home");
});

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});