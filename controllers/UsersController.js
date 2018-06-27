const models = require('../models'); // loads index.js
const User   = models.User;

import {
    encryptPassword,
    sanitizePhone,
    verifyPassword
} from '../handlers/usersHandlers';

exports.signUp = async (req, res) => {
    let {
        phone,
        password,
        firstName,
        lastName
    } = req.body;

    try {
        phone = sanitizePhone(phone);

        const user = await User.findOne({
            where: { phone }
        });

        if (user === null) {
            password = encryptPassword(password);

            User.create({
                password,
                phone,
                firstName,
                lastName
            }).then(user => {
                const newUser = user.dataValues;

                return res.status(200).json({
                    user: {
                        id:        newUser.id,
                        phone:     newUser.phone,
                        firstName: newUser.firstName,
                        lastName:  newUser.lastName
                    }
                })
            });
        }
        else {
            return res.send(422).json({
                errors: {
                    phone: 'Phone number already exists'
                }
            });
        }
    }
    catch(err) {
        console.error('error looking up user in db: ', err);

        return res.sendStatus(500);
    }
};

exports.signIn = async (req, res) => {
    let {
        phone,
        password
    } = req.body;

    try {
        phone = sanitizePhone(phone);

        const user = await User.findOne({ where: { phone } });

        if (user === null) {
            console.log(1);

            return res.status(422).json({
                errors: {
                    phone: 'Phone number not found'
                }
            });
        }
        else {
            if (verifyPassword(password, user.password)) {
                return res.status(200).json({
                    user: {
                        id:        user.id,
                        phone:     user.phone,
                        firstName: user.firstName,
                        lastName:  user.lastName
                    }
                });
            }
            else {
                return res.status(422).json({
                    errors: {
                        password: 'Password is incorrect.'
                    }
                });
            }
        }
    }
    catch(err) {
        console.error('error looking up user in the db: ', err);

        return res.status(500).json({
            errors: {
                app: 'Oops! Something went wrong.'
            }
        });
    }
};