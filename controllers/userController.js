const { User, Thought } = require('../models');

module.exports = {

    getUsers(req, res) {
        // get all users
        User.find()
            // if successful, return users as a json response
            .then((users) => res.json(users))
            // if there is an error, return status code 500 (server error) and error message
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        // get one user by its _id
        User.findOne({ _id: req.params.userId })
            .select('-_v')
            // populated thought and friend data ??????
            .populate('thoughts', 'friends')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user exists with this ID!' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            });

    },
    createUser(req, res) {
        // create a new user
        console.log("--- req.body", req.body)
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        // update user by its _id
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user exists with this ID!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        // remove user by its _id
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user exists with this ID!' })
                    : Thought.findOneAndUpdate(
                        { users: req.params.userId },
                        { $pull: { students: req.params.userId } },
                        { new: true }
                    )
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({
                        message: 'User deleted, but no thoughts found',
                    })
                    : res.json({ message: 'User and its thoughts successfully deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    addFriend(req, res) {
        // add a new friend to a user's friend list
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user exists with this ID!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    removeFriend(req, res) {
        // remove a friend from a user's friend list ?????????????
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user exists with this ID!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    }
}
