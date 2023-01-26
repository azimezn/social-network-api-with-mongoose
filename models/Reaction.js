const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionID: {
            // use mongoose's objectid data type
            // default value is set to a new objectid
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use a getter method to format the timestamp on query
        }
        // this will not be a model but rather will be used as the reaction field's subdocument schema in the thought model
    }
)

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;