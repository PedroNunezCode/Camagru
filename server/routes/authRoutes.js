const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/authControllers');

router.post('/change-email-notification-value', authControllers.changeEmailNotifications);
router.post('/change-account-details', authControllers.changeAccountDetails);
router.post('/reset-password', authControllers.resetPassword);
router.post('/send-password-reset-email', authControllers.sendPasswordEmail);
router.post('/confirm-account', authControllers.confirmAccount);
router.post('/login', authControllers.login);
router.post('/register', authControllers.register);

module.exports = router;