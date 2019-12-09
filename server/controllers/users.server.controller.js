//code for creating a user borrowed and tweaked from Bryant Wilkins: https://github.com/Bryant1-Dev/CEN3031-presentation

const User = require('../models/user.model.js')

//CRUD for admin user profiles, has to be authorized user in order to make these requests

//creates or registers new user
exports.create = function (req, res) {
    //if request is from authenticated user, proceed to create new profile
    if (req.isAuthenticated()) {

        //user info will be in request body from bodyparser
        const { name, email, password, password2 } = req.body;

        //ensures username isn't case sensitive
        let { username } = req.body;
        username = username.toLowerCase();

        //Do server-side form validation here: password length
        let errors = [];

        //Check required fields
        if (!name || !email || !password || !password2 || !username) {
            console.log("Please fill in all fields");
            errors.push({ msg: "Please fill in all fields" });
        }

        //check passwords match
        if (password !== password2) {
            console.log("Passwords do not match");
            errors.push({ msg: "Passwords do not match" });
        }

        //check password at least 6 characters
        if (password.length < 6) {
            console.log("Password should be at least 6 characters");
            errors.push({ msg: "Password should be at least 6 characters" });
        }

        //if there are errors, return false status
        if (errors.length > 0) {
            return res.send({
                status: 200,
                success: false,
                message: errors
            });
        }

        //Validation passed

        //check if username already taken
        User.findOne({ username: username }, function (err, user) {
            //if error return error
            if (err) {
                console.log("Server error: finding user from database");
                errors.push("Server error: finding user from database");
                return res.send({
                    status: 500,
                    success: false,
                    message: errors
                });
            }

            //if username already taken return false status
            if (user) {
                console.log("Username is already registered");
                errors.push({ msg: "Username is already registered" });
                return res.send({
                    status: 200,
                    success: false,
                    messsage: errors
                });
            }

            //if username not already taken, proceed to create new user profile in database
            const newUser = new User({
                name,
                username,
                email,
                password
            });

            //hash the password
            newUser.password = newUser.generateHash(password);

            //save user in database
            newUser.save(function (err) {

                //if error return error
                if (err) {
                    console.log("Server error: registering new user to database");
                    errors.push("Server error: registering new user to database");
                    return res.send({
                        status: 500,
                        success: false,
                        message: errors
                    });
                }
                //if no error return success status
                else {
                    console.log("Succcessful registration!");
                    return res.send({
                        status: 200,
                        success: true,
                        message: "Succcessful registration!"
                    });
                }
            });
        });

    }
    //if request is not from authenticated user, return false status
    else {
        console.log("Unauthorized register");
        return res.send({
            status: 200,
            success: false,
            message: "unauthorized register"
        });
    }
}

//gets all users if no username in body or specific user if username in body
exports.get = function (req, res) {
    //if request is from authenticated user, proceed to get users
    if (req.isAuthenticated()) {

        //if a username is provided in the body
        if (req.body.username) {

            //make sure username is not case sensitive
            username = req.body.username.toLowerCase();

            //check if there is a user with that username
            User.findOne({ username: username }, function (err, user) {
                //if error return error
                if (err) {
                    console.log("Server error: finding user(s) from database");
                    errors.push("Server error: finding user(s) from database");
                    return res.send({
                        status: 500,
                        success: false,
                        message: errors
                    });
                }
                
                //if no error, check if user is found
                //if user found, return success status with user
                if (user) {
                    console.log("Succcessful get one user!");
                    return res.send({
                        status: 200,
                        user: user,
                        success: true,
                        message: "Succcessful get one user!"
                    });
                }
                //if no user found, return false status
                else {
                    console.log("Cannot find username to get!");
                    return res.send({
                        status: 200,
                        success: false,
                        message: "Cannot find username to get!"
                    });
                }
                
            });
        }
        //if no username in body, look for all users in database
        else {
            User.find({}, function (err, users) {
                //if error return error
                if (err) {
                    console.log("Server error: finding user(s) from database");
                    errors.push("Server error: finding user(s) from database");
                    return res.send({
                        status: 500,
                        success: false,
                        message: errors
                    });
                }
                //if no error return users sorted with success status
                else {
                    console.log("Successful get all users");
                    res.status(200).send(users.sort(function (a, b) {
                        return a.name - b.name
                    }));
                }
              
            });
        }
    }
    else {
        //if request is not from authenticated user, return false status
        console.log("Unauthorized get");
        return res.send({
            status: 200,
            success: false,
            message: "unauthorized get"
        });
    }

    
}


//updates specific user
exports.update = function (req, res) {
    //if request is from authenticated user, proceed to update user
    if (req.isAuthenticated()) {
        //user info will be in request body from bodyparser
        const { name, email, password, password2} = req.body;

        //make sure username is not case sensitive
        let { username } = req.body;
        username = req.body.username.toLowerCase();

        //for storing errors
        let errors = [];

        //Check required fields

        //if updating password, need to have password2 to confirm
        if (password) {
            if (password2) {
                if (password !== password2) {
                    console.log("Passwords do not match");
                    errors.push({ msg: "Passwords do not match" });
                }

                if (password.length < 6) {
                    console.log("new Password should be at least 6 characters");
                    errors.push({ msg: "new Password should be at least 6 characters" });
                }
            }
            else {
                console.log("need to retype Password to verify");
                errors.push({ msg: "need to retype Password to verify" });
            }
        }

        //if errors, return false status
        if (errors.length > 0) {
            return res.send({
                status: 200,
                success: false,
                message: errors
            });
        }

        //Validation passed
        //find user to update
        User.findOne({ username: username }, function (err, user) {
            if (err) {
                console.log("Server error: finding user to update");
                errors.push("Server error: finding user to update");
                return res.send({
                    status: 500,
                    success: false,
                    message: errors
                });
            }

            //if user found, update information
            if (user) {

                if (password) {
                    user.password = user.generateHash(password);
                }
                if (name) {
                    user.name = name;
                }
                if (email) {
                    user.email = email;
                }
                //save updated user
                user.save(function (err) {
                    //if error return error
                    if (err) {
                        console.log("Server error: updating user to database");
                        errors.push("Server error: updating user to database");
                        return res.send({
                            status: 500,
                            success: false,
                            message: errors
                        });
                    }
                    //if no error return success status
                    else {
                        console.log("Successful update!");
                        return res.send({
                            status: 200,
                            success: true,
                            message: "Succcessful update!"
                        });
                    }
                });

            }
            else {
                //if cannot find user, return status false
                console.log("Cannot find user");
                errors.push({ msg: "Cannot find user" });
                return res.send({
                    status: 200,
                    success: false,
                    messsage: errors
                });

            }
           
        });

    } else {
        //if request is not from authenticated user, return false status
        console.log("unauthorized update");
        return res.send({
            status: 200,
            success: false,
            message: "unauthorized update"
        });
    }
}


//deletes user
exports.delete = function (req, res) {
    //if request is from authenticated user, proceed to delete user
    if (req.isAuthenticated()) {

        //first checks if there is only one user remaining, if so, do not delete
        User.countDocuments({}, function (err) {
            if (err) {
                console.log("Server error: counting users in database");
                errors.push("Server error: counting users in database");
                return res.send({
                    status: 500,
                    success: false,
                    message: errors
                });
            }
        }).limit(2).then(function (count) {
            //if last user, return false status
            console.log("count: ", count);
            if (count == 1) {
                console.log("cannot delete when only one user remaining");
                return res.send({
                    status: 200,
                    success: false,
                    message: "cannot delete when only one user remaining"
                });
            }
            //if not last user, proceed to try to delete
            else {
                //ensures email isn't case sensitive
                let { username } = req.body;
                username = username.toLowerCase();


                //finding user from database
                User.findOneAndRemove({ username: username }, function(err,user) {
                    //if error return error
                    if (err) {
                        console.log("Server error: deleting user from database");
                        errors.push("Server error: deleting user from database");
                        return res.send({
                            status: 500,
                            success: false,
                            message: errors
                        });
                    }

                    //if deleted user, return success status
                    if (user) {
                        console.log("delete successful");
                        return res.send({
                            status: 200,
                            success: true,
                            message: "delete successful"
                        });
                    }
                    //if cannot find user, return false status
                    else {
                        console.log("cannot find user to delete");
                        return res.send({
                            status: 200,
                            success: false,
                            message: "cannot find user to delete"
                        });
                    }
                });

            }
        });
        

        

    } else {
        //if request is not from authenticated user, return false status
        console.log("unauthorized delete");
        return res.send({
            status: 200,
            success: false,
            message: "unauthorized delete"
        });
    }
}