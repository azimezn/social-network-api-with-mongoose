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
        console.log(req.params.userId);
        User.findOne({ _id: req.params.userId })
            // ?????????? this means exclude _v from the returned document?
            .select('-_v')
            // populated thought and friend data ??????
            .populate('thoughts', 'friends')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user exists with this ID' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            });

    },
    createUser(req, res) {
        // create a new user
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        // put to update user by its _id ????????
        // $addToSet or $set
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $addToSet: req.body},
            { runValidators: true, new: true }
        )
    },
    deleteUser(req, res) {
        // delete to remove user by its _id ??????????
        User.findOneAndRemove({ _id: req / params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user exists with this ID' })
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
                    : res.json({ message: 'User successfully deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // bonus. remove a user's associated thoughts when deleted ??????????
    addFriend(req, res) {
        // post to add a new friend to a user's friend list ??????????
    },
    removeFriend(req, res) {
        // delete to remove a friend from a user's friend list ??????      
    }
}
