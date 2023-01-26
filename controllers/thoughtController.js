const { Thought } = require('../models');

module.exports = {

    getThoughts(req, res) {
        // get all thoughts
        Thought.find()
            .then((thoughts) => res.json(thuoghts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        // get one thought by its _iddata ??????
        // thoughtId ???
        Thought.findOne({ _id: req.params.thoughtId })
            // ??????????
            .select('-_v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought exists with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // post to create a new thought ????? push the created thought's _id to the associated user's thoughts array field
    createThought(req, res) {
        Thought.create(req.body)
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        // put to update thought by its _id ????????
    },
    deleteThought(req, res) {
        // delete to remove thought by its _id ??????????
    },
    addReaction(req, res) {
        // post to create a reaction stored in a single thought's reactions array field ????????
    },
    removeRection(req, res) {
        // delete to pull and remove a reaction by the reaction's reactionId value     
    }
}