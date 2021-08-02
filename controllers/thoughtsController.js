const { Thoughts, User } = require('../models/index');

const thoughtControl = {

    //get all
    allThoughts(req, res) {
        Thoughts.find({})
            .populate({
                path: 'user',
                select: '-__v'
            })
            .select('-__V')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    //get one thought by id
    oneThought({ params }, res) {
        Thoughts.findOne({ _id: params.id })
            .populate({
                path: 'user',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData)).
            catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    //create a thought
    newThought({ params, body }, res) {
        console.log(body)
        Thoughts.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.username },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                console.log(dbThoughtData)
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this username' });
                } else {
                    res.json(dbThoughtData)
                }
            })
            .catch(err => res.json(err));
    },

    //update a Thoughts
    updateThought({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought found with this Id' });
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err));
    },

    //delete a thought
    deleteThought({ params, body }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought found with this id' });
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    //add reaction
    newReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },

    //remove a reaction
    deleteReaction({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtControl;