const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    addFriend,
    updateUser,
    deleteUser,
    removeFriend
} = require('../../controllers/user-controller');

// GET all and POST at USERS
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// GET one, PUT and DELETE by ID
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

// USERS by FRIEND ID
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;

const router = require('express').Router();