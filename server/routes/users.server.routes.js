//code for user verification, login, and logout borrowed and tweaked from Bryant Wilkins: https://github.com/Bryant1-Dev/CEN3031-presentation

const express = require("express");
const passport = require("passport");
const router = express.Router();


//Router for admin User profiles

//User controller
const Users = require('../controllers/users.server.controller.js');

//Verify - this is for the frontend to verify if a user is authenticated
router.get("/verify", (req, res) => {

    console.log("This is req.session from /verify" + JSON.stringify(req.session));
    //if user is authenticated return success with user information
    if (req.isAuthenticated()) {
        const clientUser = {
            name: req.user.name,
            username: req.user.username,
            email: req.user.email,
            loggedIn: true
        };
        return res.send({
            status: 200,
            success: true,
            message: "Valid session",
            user: clientUser
        });
    }
    //if user is not authenticated return false with empty user
    else {
        emptyUser = {
            name: "",
            username: "",
            email: "",
            loggedIn: false
        };
        return res.send({
            status: 200,
            success: false,
            message: "Couldn't find session",
            user: emptyUser
        });
    }

});

//Login handle, our function defined in passport takes care of ths route
router.post("/login", passport.authenticate("local"), function (req, res) {
    
    console.log(
        "This is req.session from /login: " + JSON.stringify(req.session)
    );
    //if login success, return success status 
    return res.send({
        status: 200,
        success: true,
        message: "successful login",
    });

})

//Logout handle
router.post("/logout", (req, res) => {
    //destroy express session
    req.session.destroy(function (err) {
        //if error return error
        if (err) {
            return res.send({
                status: 500,
                success: false,
                message: "Server error: couldn't destroy session (log user out)"
            });
        }
        //if no error, log out and send success status
        req.logout();
        res.clearCookie("sid").send({
            status: 200,
            success: true,
            message: "Successfully logged out"
        });
    });
});

//CRUD for users
router.route('/')
    .get(Users.get) //READ
    .post(Users.create) //CREATE, register users
    .put(Users.update) //UPDATE
    .delete(Users.delete); //DELETE

module.exports = router;
