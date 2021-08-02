const router = require('express').Router();

const {
    findAllUsers,
    findUserById,
    newUser,
    addFriend,
    updateUser,
    deleteUser,
    removeFriend
} = require('../../controllers/userController');

router
    .route('/')
    .get(findAllUsers)
    .post(newUser)

router
    .route('/:id')
    .get(findUserById)
    .put(updateUser)
    .delete(deleteUser)

router
    .route('/:userId/friends/:friendsId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;