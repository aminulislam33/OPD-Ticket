const { TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
    lazyLoading: true
});

const countryCode = 91;

const sendOTP = async (req, res) => {
    const { phoneNumber } = req.body;

    try {
        const otpResponse = await client.verify
            .v2.services(TWILIO_SERVICE_SID)
            .verifications.create({
                to: `+${countryCode}${phoneNumber}`,
                channel: 'sms',
            });
            
        console.log(req.session)

        req.session.phoneNumber = phoneNumber;
        req.session.isVerified = false;

        console.log(req.session.phoneNumber)

        res.status(200).render("verify-otp");
    } catch (error) {
        res.status(error?.status || 400).send(error?.message || 'Something went wrong!');
    }
};

const verifyOTP = async (req, res) => {
    const { otp } = req.body;

    const phoneNumber = req.session.phoneNumber;
    console.log(phoneNumber);
    console.log(typeof (phoneNumber));

    try {
        const verifiedResponse = await client.verify
            .v2.services(TWILIO_SERVICE_SID)
            .verificationChecks.create({
                to: `+${countryCode}${phoneNumber}`,
                code: otp,
            });

        console.log("verifiedResponse object is:", verifiedResponse)
        req.session.isVerified = true;
        res.status(200).redirect("/");
    } catch (error) {
        res.status(error?.status || 400).send(error?.message || 'Something went wrong!');
    }
};

module.exports = {
    sendOTP,
    verifyOTP
}