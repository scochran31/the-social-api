const router = require('express').Router();

const {
    findAllUsers,
    findUserByID
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(findUserByID)

router
    .route('/:id')
    .get(findUserByID)

module.exports = router;