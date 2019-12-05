const nodemailer = require('nodemailer');
const chalk = require('chalk');
const config = require('../config');
const jwt = require('jsonwebtoken');

exports.sendCommentEmail = (email, comment)  => {
    nodemailer.createTestAccount(() => {
        const htmlEmail = `
            <h1>New Comment On Your Picture</h1>
            <h3>You have recieved a new comment on one of your pictures.</h3>
            <h3>Comment: ${comment}.</h3>
            <a href="http://localhost:3000/">Click here to view comment</a>
        `
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: config.GMAIL,
                pass: config.GMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: 'Camagru',
            to: email,
            replyTo: 'smediaxp42@gmail.com',
            subject: 'New Comment.',
            text: 'New comment on one of your pictures.',
            html: htmlEmail
        }
        transporter.sendMail(mailOptions, (err) => {
            if (!err) {
                console.log(chalk.blue(`Email was sent to the user regarding comments.`));
            } else {
                console.log(chalk.red(`Error while sending comment email.`));
            }
        });
    });
}

exports.setJWT = (id, username, image_struct_id, emailNotifications) => {
    const token = jwt.sign({
        userId: id,
        username: username,
        image_struct_id: image_struct_id,
        emailNotifications: emailNotifications
    }, config.SECRET, { expiresIn: '5h' });
    return (token);
}

exports.validatePasswordChange = (password) => {
    let errors = [];
    var regex = new RegExp(/^(?=.*\d).{5,32}$/);
    if(!password.match(regex)){
        errors.push("Password must be between 5 and 32 characters long and include at least one numeric digit.");
    }
    return errors;
}

exports.validateRegisterEntries = ( password, passwordV) => {
    let errors = [];
    var regex = new RegExp(/^(?=.*\d).{5,32}$/);
    if (password !== passwordV)
        errors.push("Passwords don't match!");
    if (!password.match(regex) || !passwordV.match(regex)) {
        errors.push("Password must be between 5 and 32 characters long and include at least one numeric digit.");
    }
    return (errors);
}

exports.sendPasswordResetEmail = (email, token, username) => {
    nodemailer.createTestAccount(() => {
        const htmlEmail = `
            <h1>Camagru Password Reset</h1>
            <h3>You have recently requested a camagru password change, Please click the link below to reset your password.</h3>
            <a href="http://localhost:3000/reset-password/${token}/${username}">Reset Password</a>
        `
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: config.GMAIL,
                pass: config.GMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: 'Camagru',
            to: email,
            replyTo: 'smediaxp42@gmail.com',
            subject: 'Reset Camagru Password.',
            text: 'Please follow the instructions to reset your password.',
            html: htmlEmail
        }
        transporter.sendMail(mailOptions, (err) => {
            if (!err) {
                console.log(chalk.blue(`Password reset email was sent to ${email}`));
            } else {
                console.log(chalk.red(`Error while sending password reset email to: ${email}`));
            }
        });
    });
}

exports.sendRegistrationEmail = (email, token, username) => {
    nodemailer.createTestAccount(() => {
        const htmlEmail = `
            <h1>Camagru Account Confirmation </h1>
            <h3>You have recently created a camagru account, Please click the link below to confirm your email.</h3>
            <a href="http://localhost:3000/confirm-account/${token}/${username}">Confirm Camagru Account</a>
        `
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: config.GMAIL,
                pass: config.GMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: 'Camagru',
            to: email,
            replyTo: 'smediaxp42@gmail.com',
            subject: 'Confirm Camagru Account.',
            text: 'Please confirm Camagru Account.',
            html: htmlEmail
        }
        transporter.sendMail(mailOptions, (err) => {
            if (!err) {
                console.log(chalk.blue(`Confirmation email was sent to ${email}`));
            } else {
                console.log(chalk.red(`Error while sending confirmation email to: ${email}`));
            }
        });
    });
}