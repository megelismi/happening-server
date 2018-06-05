const models = require('../models'); // loads index.js
const User   = models.User;

import {
    encryptPassword,
    sanitizePhone
} from '../handlers/usersHandlers';

exports.create = async (req, res) => {
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
                error: 'Could not complete sign up, a user with that phone # already exists.'
            });
        }
    } catch(err) {
        console.error('error looking up user in db: ', err);

        res.sendStatus(500);
    }

    return res.sendStatus(200);
};