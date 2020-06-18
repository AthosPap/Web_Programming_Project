'use strict';
/** Διαλέξτε το κατάλληλο μοντέλο */
const model = require('../model/tennis-club-model-mysql.js');
//const model = require('../model/task-list-model-mongo.js'); 

const path = require('path');

const logInController = require('./log-in-controller');


exports.getSlash = function (req, res) {
    res.redirect('/home.html');
}

exports.getHome = function (req, res) {
    let data = {
        layout: false,
        user: req.session.loggedUserId
    };
    if (data.user) {
        model.checkAdmin(req.session.loggedUserId, (isAdmin) => {
            data.isAdmin = encodeURIComponent(JSON.stringify(isAdmin))
            res.render('home', data);
        })
    }
    else {
        data.isAdmin = encodeURIComponent(JSON.stringify(false))
        res.render('home', data);
    }
}

exports.getFacilities = function (req, res) {
    let data = {
        layout: false,
        user: req.session.loggedUserId
    };
    if (data.user) {
        model.checkAdmin(req.session.loggedUserId, (isAdmin) => {
            data.isAdmin = encodeURIComponent(JSON.stringify(isAdmin))
            res.render('facilities', data);
        })
    }
    else {
        data.isAdmin = encodeURIComponent(JSON.stringify(false))
        res.render('facilities', data);
    }
}

exports.getGallery = function (req, res) {
    let data = {
        layout: false,
        user: req.session.loggedUserId
    };
    if (data.user) {
        model.checkAdmin(req.session.loggedUserId, (isAdmin) => {
            data.isAdmin = encodeURIComponent(JSON.stringify(isAdmin))
            res.render('gallery', data);
        })
    }
    else {
        data.isAdmin = encodeURIComponent(JSON.stringify(false))
        res.render('gallery', data);
    }
}

exports.getContact = function (req, res) {
    let data = {
        layout: false,
        user: req.session.loggedUserId
    };
    if (data.user) {
        model.checkAdmin(req.session.loggedUserId, (isAdmin) => {
            data.isAdmin = encodeURIComponent(JSON.stringify(isAdmin))
            res.render('contact', data);
        })
    }
    else {
        data.isAdmin = encodeURIComponent(JSON.stringify(false))
        res.render('contact', data);
    }
}

exports.getTournaments = function (req, res) {
    logInController.checkAuthenticated(req, res, function () {
        model.checkAdmin(req.session.loggedUserId, (isAdmin) => {
            let data = {
                layout: false,
                user: req.session.loggedUserId
            };
            if (isAdmin) {
                res.render('tournaments-admin', data);
            }
            else {
                res.render('tournaments', data);
            }
        })
    });
}

exports.getCourts = function (req, res) {
    logInController.checkAuthenticated(req, res, function () {
        model.checkAdmin(req.session.loggedUserId, (isAdmin) => {
            let data = {
                layout: false,
                user: req.session.loggedUserId
            };
            if (isAdmin) {
                res.render('courts-admin', data);
            }
            else {
                res.render('courts', data);
            }
        })
    });
}

exports.handleReservation = function (req, res) {
    let facility = req.body.facility;
    let date = req.body.date;
    let time = req.body.time;
    let type = req.body.submit;
    let usrname = req.body.username;
    let surname = req.body.surname;
    let phone = req.body.phone;
    console.log("faciity = ", facility);
    console.log("date = ", date);
    console.log("time = ", time);
    console.log("type = ", type);
    if (type == "Κράτηση") {
        model.checkAdmin(req.session.loggedUserId, function (isAdmin) {
            if (!isAdmin) {
                model.checkOtherFacilities(date, time, req.session.loggedUserId, function (result) {
                    if (result.length == 0) {
                        model.getNumOfReservations(date, req.session.loggedUserId, function (reserv) {
                            if (reserv.length < 4) {
                                model.insertReservation(facility, date, time, null, null, req.session.loggedUserId, function () {
                                    res.json({ resp: "ok" });
                                })
                            }
                            else {
                                res.json({ resp: "too many" });
                            }
                        })
                    }
                    else {
                        res.json({ resp: "multiple" });
                    }
                })
            }
            else {
                if (!usrname) {
                    model.insertReservation(facility, date, time, surname, phone, usrname, function () {
                        res.json({ resp: "ok" });
                    })
                }
                else {
                    model.getUserInformation(usrname, function (data) {
                        if (data) {
                            model.insertReservation(facility, date, time, surname, phone, usrname, function () {
                                res.json({ resp: "ok" });
                            })
                        }
                    })
                }
            }
        })
    }
    else {
        model.removeReservation(facility, date, time, function () {
            res.json({ resp: "ok" });
        })
    }
}

exports.getTimes = function (req, res) {
    let params = req.params.datefacility.split(",");
    console.log(params[0], params[1]);
    model.getTime(params[0], params[1], req.session.loggedUserId, function (result) {
        res.json(result);
    })
}

exports.getAdminTimes = function (req, res) {
    let params = req.params.datefacility.split(",");
    console.log("admin", params[0], params[1]);
    model.getAdminTime(params[0], params[1], function (result) {
        console.log("result = ", result);
        res.json(result);
    })
}

exports.handleMessage = function (req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let message = req.body.message;
    console.log(name, email, message);
    model.saveMessage(name, email, message, function () {
        if (req.session.loggedUserId) {
            model.checkAdmin(req.session.loggedUserId, (isAdmin) => {
                let data = {
                    layout: false,
                    user: req.session.loggedUserId,
                    sent: true
                };
                if (data.user) {
                    model.checkAdmin(req.session.loggedUserId, (isAdmin) => {
                        data.isAdmin = encodeURIComponent(JSON.stringify(isAdmin))
                        res.render('contact', data);
                    })
                }
                else {
                    res.render('contact', data);
                }
            })
        }
        else {
            let data = {
                layout: false,
                user: req.session.loggedUserId,
                sent: true
            };
            res.render('contact', data);
        }
    })
}

exports.getMessages = function (req, res) {
    let data = {
        layout: false,
        user: req.session.loggedUserId
    };
    if (data.user) {
        model.checkAdmin(req.session.loggedUserId, (isAdmin) => {
            if (isAdmin) {
                res.render('messages', data);
            }
            else {
                res.redirect('/');
            }
        })
    }
    else {
        res.redirect('/login.html');
    }
}

exports.getAllMessages = function (req, res) {
    model.getEveryMessage(function (result) {
        res.json(result);
    })
}

exports.handleParticipation = function (req, res) {
    let type = req.body.sub.slice(-3);
    let id = req.body.sub.slice(0, -3);
    if (type == "add") {
        let params = null;
        if (req.body.teamname) {
            params = {
                name: req.body.teamname,
                email: req.body.teamemail,
                phone: req.body.teamphone
            };
        }
        let usr = req.session.loggedUserId;
        if (req.body.surname) {
            usr = null;
            params = {
                name: req.body.teamSurname,
                phone: req.body.teamPhone,
                email: null
            }
        }
        model.saveParticipation(usr, id, params, req.body.surname, req.body.phone, function () {
            res.json({ resp: "ok" });
        })
    }
    else if (type == "del") {
        if (req.body.username) {
            model.removeUserParticipation(req.body.username, id, function () {
                res.json({ resp: "ok" });
            })
        }
        else {
            model.removeNonUserParticipation(req.body.surname, req.body.phone, id, function () {
                res.json({ resp: "ok" });
            })
        }
    }
    else if (type == "tou") {
        let name = null;
        if (req.files.photo) {
            name = req.files.photo.name;
        }
        model.addTournament(req.body.name, req.body.dates, req.body.type, name, function () {
            if (req.files.photo) {
                let photo = req.files.photo;
                photo.mv(path.join(__dirname, '../views/images/' + name), function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(photo.name);
                    res.json({ resp: "ok" });
                });
            }
            else {
                res.json({ resp: "ok" });
            }
        })
    }
    else if (type == "dto") {
        model.removeTournament(id, function () {
            res.json({ resp: "ok" });
        })
    }
}

exports.getParticipation = function (req, res) {
    model.checkParticipation(req.session.loggedUserId, function (result) {
        res.json(result);
    })
}

exports.getParticipations = function (req, res) {
    model.checkParticipations(function (result) {
        res.json(result);
    })
}

exports.removeMessage = function (req, res) {
    console.log(req.body.message);
    model.removeMess(req.body.message, function (result) {
        res.json({ resp: "ok" });
    })
}

exports.getAllTournaments = function (req, res) {
    model.getTournaments(function (result) {
        res.json(result);
    })
}