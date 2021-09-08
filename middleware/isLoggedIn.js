function isLoggedIn(req,res,next) {
    if (!req.user) {
        req.flash('error', 'You have to be signed to access this page');
        res.redirect('/auth/login');
    } else {
        next();
    }
}

module.exports = isLoggedIn;