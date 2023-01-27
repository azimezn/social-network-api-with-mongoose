const { Thought } = require('../models');

module.exports = {

    getThoughts(req, res) {
        // get all thoughts
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        // get one thought by its _id
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-_v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought exists with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // push the created thought's _id to the associated user's thoughts array field ?????????
    createThought(req, res) {
        // create a new thought
        Thought.create(req.body)
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        // update thought by its _id
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought exists with this ID!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        // remove thought by its _id
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No user exists with this ID!' })
                    : res.json({ message: 'Thought successfully deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    addReaction(req, res) {
        // create a reaction in a single thought
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought exists with this ID!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    removeReaction(req, res) {
        // delete to pull and remove a reaction by the reaction's reactionId value ????? added a route not on the readme...     
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: { $in: [req.params.reactionId] } } } },
            // { $pull: { reactions } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought exists with this ID!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    }
}