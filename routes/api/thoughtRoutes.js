const router = require('express').Router();

const {
    allThoughts,
    oneThought,
    newThought,
    updateThought,
    deleteThought,
    newReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');

router
    .route('/')
    .post(newThought)
    .get(allThoughts)

router
    .route('/:id')
    .get(oneThought)
    .put(updateThought)
    .delete(deleteThought)

router
    .route('/:thoughtId/reactions')
    .post(newReaction)

router
    .route('/:thoughtId/:reactionId')
    .delete(deleteReaction)

module.exports = router;