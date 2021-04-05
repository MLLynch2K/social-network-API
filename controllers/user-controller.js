const { User, Thought } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .select('-__v') 
        .sort({ _id: 1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    createUser( {body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate(
            {
                path: 'thoughts',
                select: '-__v'
            }
        )
        .populate(
            {
                path: 'friends',
                select: '-__v'
            },
        )
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user 👨🏼‍🎤 found with this ID '})
                return;
            }
            res.json(dbUserData)
            console.log(`You found User: ${params.id}`)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    updateUserById({ params, body}, res) {
        User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user 👨🏼‍🎤 found with this id!' })
                return;
            }
            res.json(dbUserData);
            console.log("User Updated!");
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    deleteUser({params}, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user 👨🏼‍🎤 found with this ID!'})
                return;
            }
            res.json(dbUserData)
            console.log('User deleted!')
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    addFriend( {params}, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendId }},
            { new: true, runValidators: true}
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user 👨🏼‍🎤 found with this ID!'})
                return;
            }
            res.json(dbUserData);
            console.log('Friend Added successfully!')
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: {friends: params.friendId }},
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No Friend by ID'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }
}

module.exports = userController;