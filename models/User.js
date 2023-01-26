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
            // matches a regex for email
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        },
        // array of _id values referencing thought model
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }],
        // array of _id values referencing User model (self-reference)
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        // allows virtuals to be included when documents are converted to JSON
        // virtuals are not saved in the database
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// creates a virtual called friendCount that retrieves the length of the user's friends array field on query
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// creates a mongoose model
const User = model('user', userSchema);

module.exports = User;