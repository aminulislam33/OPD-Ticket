const express = require('express');
const { handleUserLOgin, handleUserOTP } = require('../controllers/user');
const router = express.Router();

router.get("/login", (req,res)=>{return res.render("send-otp")});
router.post("/login", handleUserLOgin);
router.get("/otp", (req,res)=>{return res.render("verify-otp")});
router.post("/otp", handleUserOTP);

module.exports = router;