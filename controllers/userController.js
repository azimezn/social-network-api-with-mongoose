const { User } = require('../models');

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
        // get one user by its _id and populated thought and friend data ??????
        User.findOne({ _id: req.params.userId })
            // ?????????? this means exclude _v from the returned document?
            .select('-_v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user exists with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        // post a new user ????????????
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        // put to update user by its _id ????????
    },
    deleteUser(req, res) {
        // delete to remove user by its _id ??????????
    },
    // bonus. remove a user's associated thoughts when deleted ??????????
    addFriend(req, res) {
        // post to add a new friend to a user's friend list ??????????
    },
    removeFriend(req, res) {
        // delete to remove a friend from a user's friend list ??????      
    }
}
