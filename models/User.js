const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            // will always call .trim() on the value
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, ???
        },
        thoughts: {
            //array of _id values referencing thought model
        },
        friends: {
            //array of _id values referencing User model(self-reference)
        }
    },
    {
        // allows virtuals to be included when documents are converted to JSON
        // virtuals are not saved in the database
        toJSON: {
            virtuals: true,
        }
    }
);

// creates a virtual called friendCount that retrieves the length of the user's friends array field on query
postSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// creates a mongoose model
const User = model('user', userSchema);

module.exports = User;