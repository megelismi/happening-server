import { requiredParam } from '../middleware/httpRequests';

const router = require('express').Router();

import UsersController from '../controllers/UsersController';

router.get('/', (req, res) => {
    console.log('got to get user route')
});

router.post(
    '/create',
    (req, res, next) => requiredParam(req, res, next, ['password', 'firstName', 'lastName', 'phone']),
    UsersController.create
);

module.exports = router;
