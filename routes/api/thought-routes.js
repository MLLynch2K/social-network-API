const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    addReaction,
    updateThought,
    deleteThought,
    removeReaction
} = require('../../controllers/thought-controller')

// GET all and POST at /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

// GET one, PUT, DELETE by _id at /api/thoughts/:id  
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

// api/thoughts/:thoughtId/reactions   
router
    .route('/:thoughtId/reactions')
    .post(addReaction)

// api/thoughts/:thoughtId/reactionId
router
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction)

module.exports = router;