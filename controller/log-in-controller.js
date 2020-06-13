'use strict';
const bcrypt = require('bcrypt');

/** Διαλέξτε το κατάλληλο μοντέλο */
const model = require('../model/tennis-club-model-mysql.js');
//const model = require('../model/task-list-model-mongo.js');


exports.getSignUp = function (req, res) {
    res.render('sign-up', { layout: false });
}

exports.getLogin = function (req, res) {
    if (!req.session.originalUrl || (req.session.originalUrl.indexOf('courts') == -1 && req.session.originalUrl.indexOf('tournaments') == -1)) {
        req.session.originalUrl = req.headers.referer;
    }
    res.render('login', { layout: false });
}

exports.processSignUp = function (req, res) {
    let name = req.body.name;
    let surname = req.body.surname;
    let username = req.body.username;
    let email = req.body.email;
    let phone = req.body.phone;
    let birthdate = req.body.birthdate;
    let password = req.body.password;
    let passwordRep = req.body.passwordRep;
    if (username) {
        let data = {
            layout: false,
            name: encodeURIComponent(JSON.stringify(name)),
            surname: encodeURIComponent(JSON.stringify(surname)),
            username: encodeURIComponent(JSON.stringify(username)),
            email: encodeURIComponent(JSON.stringify(email)),
            phone: encodeURIComponent(JSON.stringify(phone)),
            birthdate: encodeURIComponent(JSON.stringify(birthdate)),
            keepData: true
        };
        model.checkUserData(username, function (result) {
            if (result) {
                data.usernameTaken = true;
                res.render('sign-up', data);
            }
            else {
                model.checkForEmail(email, function (eresult) {
                    if (eresult) {
                        data.emailTaken = true;
                        res.render('sign-up', data);
                    }
                    else {
                        if (name && surname && username && email && password && passwordRep) {
                            if (password.length >= 8) {
                                if (phone.length == 10) {
                                    if (password == passwordRep) {
                                        bcrypt.hash(password, 10, function (err, hashedPassword) {
                                            if (err) {
                                                console.log(error);
                                                res.redirect('sign-up.html');
                                            }
                                            else {
                                                console.log("pass = " + hashedPassword);
                                                model.createAccount(name, surname, username, email, phone, birthdate, hashedPassword);
                                                res.redirect('../login.html');
                                            }
                                        });
                                    }
                                    else {
                                        console.log("error");
                                        console.log("passwords dont match");
                                        res.render('sign-up', data);
                                    }
                                }
                                else {
                                    data.notPhone = true;
                                    res.render('sign-up', data);
                                }
                            }
                            else {
                                data.notSecure = true;
                                res.render('sign-up', data);
                            }
                        }
                        else {       //doesnt make sense since we have all these field required
                            data.notAllFields = true;
                            console.log("not all fields");
                            res.render('sign-up', data);
                        }
                    }
                })
            }
        })
    }
}

exports.processLogin = function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let remember = req.body.rem;
    model.checkUserData(username, function (pass) {
        if (pass) {
            bcrypt.compare(password, pass.password, function (err, result) {
                if (err) {
                    console.log(err);
                    res.redirect('login.html');
                }
                else {
                    if (result == true) {
                        req.session.loggedUserId = username;
                        if (remember) {
                            req.session.cookie.maxAge = 21 * 24 * 3600 * 1000
                        }
                        if (req.session.originalUrl) {
                            res.redirect(req.session.originalUrl);
                        }
                        else {
                            res.redirect('../home.html');
                        }
                    }
                    else {
                        console.log("the username or password entered are incorrect");
                        let data = {
                            layout: false,
                            mistake: true
                        };
                        res.render('login', data);
                    }
                }
            });
        }
        else {
            console.log("no such username in our database");
            let data = {
                layout: false,
                mistake: true
            };
            res.render('login', data);
        }
    });
}

exports.getUserInfoPage = function (req, res) {
    let data = {
        layout: false
    }
    res.render('user-info', data);
}

exports.getUserInfo = function (req, res) {
    model.getUserInformation(req.session.loggedUserId, function (query) {
        let data = {
            layout: false
        }
        res.json(query);
    });
}

exports.saveUserInfo = function (req, res) {
    let name = req.body.name;
    let surname = req.body.surname;
    let username = req.session.loggedUserId;
    let email = req.body.email;
    let phone = req.body.phone;
    let birthdate = req.body.birthdate;
    model.updateUserInformation(username, name, surname, email, phone, birthdate, function () {
        let data = {
            layout: false
        }
        res.render('user-info', data);
    });
}

exports.logout = function (req, res) {
    console.log("logging out");
    let prevUrl = req.headers.referer;
    if (prevUrl.indexOf('courts') != -1 || prevUrl.indexOf('messages') != -1 || prevUrl.indexOf('tournaments') != -1) {
        prevUrl = '/';
    }
    req.session.destroy();
    res.redirect(prevUrl);
}

exports.getBack = function (req, res) {

}

//Τη χρησιμοποιούμε για να ανακατευθύνουμε στη σελίδα /login όλα τα αιτήματα από μη συνδεδεμένςου χρήστες
exports.checkAuthenticated = function (req, res, next) {
    //Αν η μεταβλητή συνεδρίας έχει τεθεί, τότε ο χρήστης είναι συνεδεμένος
    if (req.session.loggedUserId) {
        console.log("user is authenticated");
        //Καλεί τον επόμενο χειριστή (handler) του αιτήματος
        next();
    }
    else {
        req.session.originalUrl = req.originalUrl;
        res.redirect('/login.html');
    }
}

//Τη χρησιμοποιούμε για να κρύψουμε τη φόρμα login και τη register από τους χρήστες που είναι ήδη
//συνδεδεμένοι
exports.checkNotAuthenticated = function (req, res, next) {
    //Αν η μεταβλητή συνεδρίας έχει τεθεί, τότε ο χρήστης είναι συνεδεμένος
    if (req.session.loggedUserId) {
        console.log("user is authenticated2");
        //Καλεί τον επόμενο χειριστή (handler) του αιτήματος
        res.redirect('/');
    }
    else {
        next();
    }
}