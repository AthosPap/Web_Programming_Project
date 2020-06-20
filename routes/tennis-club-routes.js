'use strict';

const express = require('express');
const router = express.Router();
const tennisCLubController = require('../controller/tennis-club-controller'); 
//Για την υποστήριξη σύνδεσης/αποσύνδεσης χρηστών 
const logInController = require('../controller/log-in-controller');

router.route('/').get(tennisCLubController.getSlash);

router.route('/home.html').get(tennisCLubController.getHome);
router.route('/facilities.html').get(tennisCLubController.getFacilities); 
router.route('/gallery.html').get(tennisCLubController.getGallery);
router.route('/contact.html').get(tennisCLubController.getContact);
router.route('/tournaments.html').get(tennisCLubController.getTournaments);
router.route('/sign-up.html').get(logInController.checkNotAuthenticated, logInController.getSignUp);
router.route('/login.html').get(logInController.checkNotAuthenticated, logInController.getLogin);
router.route('/logout').get(logInController.checkAuthenticated, logInController.logout); 
router.route('/user-info.html').get(logInController.checkAuthenticated, logInController.getUserInfoPage);
router.route('/user-info/info').get(logInController.checkAuthenticated, logInController.getUserInfo);
router.route('/courts.html').get(tennisCLubController.getCourts);
router.route('/courts/:datefacility').get(tennisCLubController.getTimes);
router.route('/courts/admin/:datefacility').get(tennisCLubController.getAdminTimes);
router.route('/messages.html').get(tennisCLubController.getMessages);
router.route('/messages/all').get(tennisCLubController.getAllMessages);
router.route('/tournaments/tournaments').get(tennisCLubController.getAllTournaments);
router.route('/tournaments/participation').get(tennisCLubController.getParticipation);
router.route('/tournaments/all').get(tennisCLubController.getParticipations);

router.route('/sign-up.html').post(logInController.processSignUp);
router.route('/login.html').post(logInController.processLogin);
router.route('/user-info.html').post(logInController.saveUserInfo);
router.route('/courts.html').post(tennisCLubController.handleReservation);
router.route('/contact.html').post(tennisCLubController.handleMessage);
router.route('/tournaments.html').post(tennisCLubController.handleParticipation);
router.route('/messages.html').post(tennisCLubController.removeMessage);

module.exports = router;