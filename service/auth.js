async function checkAuth(req, res, next){
    if(req.session.isVerified){
        next()
    } else{
        return res.redirect("/user/login")
    }
};

module.exports = {
    checkAuth
}