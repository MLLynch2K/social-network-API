const { User, Thought } = require('../models');

const thoughtController = {

    // GET All Thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate(
            {
                path: 'user',
                select: '-__v'
            }
        )
        .select('-__v')
        .sort({ _id: 1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },    

    // GET Thoughts by ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate(
            {
                path: 'user',
                select: '-__v'
            }
        )    
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought 🤯 found with this ID!'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    // Create Thought
    createThought( { body }, res) {
        Thought.create( body )
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { username: body.username },
                { $push: {thoughts: _id }},
                { new: true }
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'Sorry Dave...🤖 No User found with this username!'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err))
    },

    // Update Thought
    updateThoughtById({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
        .then(updateThoughtById => {
            if(!updateThoughtById) {
                res.status(404).json({ message: 'No Thought 🤯 found with this Id!'})
                return;              
            }
            res.json(updateThoughtById)
        })
        .catch(err => res.json(err))
    },

    // Delete Thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(deleteThought => {
            if(!deleteThought) {
                res.status(404).json({ message: 'No thought 🤯 found with this ID!'})
                return
            }        
            res.json(deleteThought);
            console.log(" ")
            console.log("Thought deleted!")
            console.log(" ")
        })
        .catch(err => res.json(err));
    },

    // Add Reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body }},
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought 🤯 found with this ID!'})
                return;
            }
            res.json(dbThoughtData)
            console.log(" ")
            console.log("Reaction added")
            console.log(" ")
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // Delete Reaction 
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought 🤯 found with this ID!'})
                return;
            }
            res.json(dbThoughtData);
            console.log(" ")
            console.log("Reaction successfully deleted!")
            console.log(" ")
        })
    }
}

module.exports = thoughtController;