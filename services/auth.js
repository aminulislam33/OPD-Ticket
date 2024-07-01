async function checkAuth(req, res, next) {

    if (req.session.isVerified) {
        next();
    } else {
        res.redirect('/twilio-sms/send-otp');
    }
};

module.exports = {
    checkAuth
}