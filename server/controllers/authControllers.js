const { User, Image } = require('../models/UserModel');
const config = require('../config/index');
const chalk = require('chalk');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cryptoToken = require('crypto-token');
const controllerHelpers = require('./controllerHelpers');

exports.changeEmailNotifications = (req, res) => {
    const { notificationValue, userId } = req.body;
    User.findById({ _id: userId }, (err, foundUser) => {
        if (err) {
            let errors = [];
            errors.push("Error while loading your data. Please try again later.");
            return res.status(404).send(errors);
        } else {
            foundUser.emailNotifications = notificationValue;
            foundUser.save((err, success) => {
                if (err) {
                    errors.push("Problem while saving your preference. Please try again later.");
                    return res.status(404).send(errors);
                } else if (success) {
                    const token = controllerHelpers.setJWT(success._id, success.username,
                        success.images._id, success.emailNotifications);
                    return res.status(200).send(token);
                }
            })
        }
    })
}

exports.resetPassword = (req, res) => {
    const { username, token, password } = req.body;
    let errors = [];

    User.findOne({ username: username }, (err, foundUser) => {
        if (err) {
            errors.push(`Account with username: ${username} doesn't exist.`);
            return res.status(404).send(errors);
        }
        if (foundUser && foundUser.passwordVerificationToken === token) {
            errors = controllerHelpers.validatePasswordChange(password);
            if (errors.length > 0) {
                return res.status(404).send(errors);
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        foundUser.password = hash;
                        foundUser.passwordVerificationToken = '';
                        foundUser.save((err, success) => {
                            if (err) {
                                errors.push("Problem while saving new password. Please try again!");
                                return res.status(404).send(errors);
                            } else {
                                const token = controllerHelpers.setJWT(success._id, success.username,
                                    success.images._id, success.emailNotifications);
                                return res.status(200).send(token);
                            }
                        })
                    });
                });
            }
        } else {
            errors.push("You are not authorized to do this action.");
            return res.status(404).send(errors);
        }
    });
}

exports.sendPasswordEmail = (req, res) => {
    const errors = [];
    const { username } = req.body;
    User.findOne({ username: username.toLowerCase() }, (err, foundUser) => {
        if (err) {
            errors.push("An Account with that username does not exist.");
            return res.status(404).send(errors);
        }
        if (foundUser) {
            const { email } = foundUser;
            let token = cryptoToken(30);

            foundUser.passwordVerificationToken = token;
            foundUser.save((err, success) => {
                if (success) {
                    controllerHelpers.sendPasswordResetEmail(email, token, username);
                    return res.status(200).send();
                } else {
                    errors.push("Error whilst saving information. Please try again.");
                    return res.status(401).send(errors);
                }
            })

        }

        if (!err && !foundUser) {
            errors.push("An Account with that username does not exist.");
            return res.status(404).send(errors);
        }
    });
}

exports.changeAccountDetails = (req, res) => {
    const { passwordChange, usernameChange, emailChange } = req.body;
    if (usernameChange) {
        User.findOne({ username: 'pedrocodssse' }, (err, foundUser) => {
            if (err) {
                let errors = [];
                errors.push("Error while loading your data. Please try again later.");
                return res.status(404).send(errors);
            } else if (foundUser) {
                let errors = [];
                errors.push("This Username is taken please try another username.");
                return res.status(404).send(errors);
            } else if (!foundUser) {
                User.findById({ _id: usernameChange.userId }, (err, foundCurrentUser) => {
                    if (err) {
                        let errors = [];
                        errors.push("Error while loading your data. Please try again later.");
                        return res.status(404).send(errors);
                    } else if (foundCurrentUser) {
                        foundCurrentUser.username = usernameChange.username.toLowerCase();
                        foundCurrentUser.save((err, success) => {
                            if (err) {
                                errors.push("Problem while saving new username. Please try again later.");
                                return res.status(404).send(errors);
                            } else if (success) {
                                return res.status(200).send();
                            }
                        });
                    }
                });
            }
        });
    } else if (passwordChange) {
        let errors = controllerHelpers.validatePasswordChange(passwordChange.password);
        if (errors.length > 0) {
            return res.status(404).send(errors);
        } else {
            User.findById({ _id: passwordChange.userId }, (err, foundUser) => {
                if (err) {
                    errors.push("Error while loading your account please try again later.");
                    return res.status(404).send(errors);
                }
                if (foundUser) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(passwordChange.password, salt, (err, hash) => {
                            if (err) throw err;
                            foundUser.password = hash;
                            foundUser.save((err, success) => {
                                if (err) {
                                    errors.push("Problem while saving new password. Please try again!");
                                    return res.status(404).send(errors);
                                } else if (success) {
                                    return res.status(200).send();
                                }
                            })
                        });
                    });
                }
            });
        }
    } else if (emailChange) {
        User.findById({ _id: emailChange.userId }, (err, foundUser) => {
            if (err) {
                let errors = [];
                errors.push("Error while loading your account please try again later.");
                return res.status(404).send(errors);
            } else {
                foundUser.email = emailChange.email;
                foundUser.save((err, success) => {
                    if (err) {
                        let errors = [];
                        errors.push("Error while saving your information please try again later.");
                        return res.status(404).send(errors);
                    } else if (success) {
                        return res.status(200).send();
                    }
                });
            }
        });
    }
}

exports.confirmAccount = (req, res) => {
    const errors = [];
    const { token, username } = req.body;
    User.findOne({ username: username }, (err, foundUser) => {
        if (err) {
            errors.push("Something went wrong this is our fault.");
            return res.status(404).send(errors);
        } else if (foundUser.length < 1) {
            errors.push("An account with this username does not exist");
            return res.status(401).send(errors);
        } else {
            if (foundUser.verificationToken === token && !foundUser.verifiedAccount) {
                foundUser.verifiedAccount = true;
                foundUser.verificationToken = '';
                foundUser.save((err, newUser) => {
                    if (err) {
                        errors.push("Something went wrong this is our fault.");
                        return res.status(404).send(errors);
                    } else {
                        const token = controllerHelpers.setJWT(newUser._id, newUser.username,
                            newUser.images._id, newUser.emailNotifications);
                        return res.status(200).send(token);
                    }
                });
            } else if (foundUser.verifiedAccount === true) {
                errors.push("This account has already been verified");
                return res.status(401).send(errors);
            } else {
                errors.push("You don't have the right credentials to do this action");
                return res.status(401).send(errors);
            }
        }
    });
}

exports.login = (req, res) => {
    const errors = [];
    const { username, password } = req.body;

    User.findOne({ username: username.toLowerCase() }, (err, foundUser) => {
        if (foundUser === null) {
            errors.push("Username does not belong to a camagru account");
            return res.status(401).send(errors);
        } else if (!foundUser.verifiedAccount) {
            errors.push("You have not confirmed your account");
            return res.status(401).send(errors);
        } else if (foundUser.hasSamePassword(password)) {
            const token = controllerHelpers.setJWT(foundUser._id, foundUser.username,
                foundUser.images._id, foundUser.emailNotifications);
            return res.status(200).send(token);
        } else {
            errors.push("Wrong Password");
            return res.status(401).send(errors);
        }
    });
}

exports.register = (req, res) => {
    let errors = [];
    const { username, email, password, passwordV } = req.body;
    errors = controllerHelpers.validateRegisterEntries(password, passwordV);
    if (errors.length > 0) {
        return res.status(400).send(errors);
    } else {
        const verificationToken = cryptoToken(30);
        let newUser = new User({
            username: username.toLowerCase(), email, password, verificationToken
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                const newImageStruct = new Image({
                    profileId: mongoose.Types.ObjectId(newUser._id),
                });
                newImageStruct.save()
                    .then(savedImageStruct => {
                        newUser.images = savedImageStruct._id;
                        newUser.save(function (err, newUser) {
                            if (err) {
                                if (err.name == 'ValidationError') {
                                    for (field in err.errors) {
                                        errors.push(err.errors[field].message);
                                    }
                                    return res.status(400).send(errors);
                                } else {
                                    return res.status(404).send();
                                }
                            } else if (newUser) {
                                controllerHelpers.sendRegistrationEmail(email, verificationToken, username);
                                return res.status(200).send();
                            }
                        });
                    });
            });
        });
    }
}
