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
        const user = await User.findOne({ where: { phone } });

        firstName = firstName.trim();
        lastName  = lastName.trim();
        password  = encryptPassword(password);
        phone     = sanitizePhone(phone);

        if (user === null) {
            User.create({
                firstName,
                lastName,
                password,
                phone
            });
        } else {
            return res.send(500).json({
                errors: {
                    app: 'Could not complete sign up, a user with that phone # already exists.'
                }
            });
        }
    } catch(err) {
        console.error('error looking up user in db: ', err);

        res.sendStatus(500);
    }

    return res.sendStatus(200);
};

exports.signIn = async (req, res) => {
    let {
        phone,
        password
    } = req.body;

    phone = sanitizePhone(phone);

    try {
        const user = await User.findOne({ where: { phone } });

        if (user === null) {
            return res.status(500).json({
                errors: {
                    app: 'We did not find that phone number in our records. Did you mean to sign in?'
                }
            });
        } else {
            if (verifyPassword(password, user.password)) {
                return res.status(200).json({ user: {
                   id:        user.id,
                   firstName: user.firstName,
                   lastName:  user.lastName,
                   phone:     user.phone
               }});
            } else {
                return res.status(401).json({
                    errors: {
                        password: 'That password is incorrect. Please try again.'
                    }
                });
            }
        }
    } catch(err) {
        console.error('error looking up user in the db: ', err);

        return res.status(500).json({
            errors: {
                app: 'Oops! Something went wrong.'
            }
        });
    }

};