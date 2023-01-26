const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')
const dateFormat = require('../utils/dateFormat')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use a getter method to format the timestamp on query ??????????
            get: (timestamp) => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true,
        },
        // array nested documents created with the reactionSchema ??????????
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;