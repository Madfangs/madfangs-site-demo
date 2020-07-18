// Checks if the user is logged in.
// If logged in -> controll is passed to the next function in the middleware stack
// else -> user is redirected to the home directory

const authenticationCheck = (req, res, next)=>{
    if(!req.isAuthenticated || !req.isAuthenticated()) {
        res.redirect('/');
    } else {
        next();
    }
}

module.exports = authenticationCheck;