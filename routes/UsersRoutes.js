import { requiredParam } from '../middleware/httpRequests';

const router = require('express').Router();

import UsersController from '../controllers/UsersController';

router.get('/', (req, res) => {
    console.log('got to get user route')
});

router.post(
    '/signUp',
    (req, res, next) => requiredParam(req, res, next, ['password', 'firstName', 'lastName', 'phone']),
    UsersController.signUp
);

router.post(
    '/signIn',
    (req, res, next) => requiredParam(req, res, next, ['password', 'phone']),
    UsersController.signIn
);

module.exports = router;
