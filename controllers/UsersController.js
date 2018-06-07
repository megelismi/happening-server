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
        password
    } = req.body;

    try {
        phone = sanitizePhone(phone);

        const user = await User.findOne({ where: { phone } });

        if (user === null) {
            password = encryptPassword(password);

            User.create({
                password,
                phone
            });
            
            return res.status(200).json({ user: { id: '0', phone: 'test' } });
        }
        else {
            return res.send(422).json({
                errors: {
                    app: 'A user with that phone number already exists. Did you mean to sign in?'
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
            return res.status(422).json({
                errors: {
                    app: 'We did not find that phone number in our records. Did you mean to sign in?'
                }
            });
        }
        else {
            if (verifyPassword(password, user.password)) {
                return res.status(200).json({ user: { id: user.id, phone: user.phone } });
            }
            else {
                return res.status(422).json({
                    errors: {
                        password: 'That password is incorrect. Please try again.'
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