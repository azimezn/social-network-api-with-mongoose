// this is not a model, it is used as the reaction field's subdocument schema in the thought model
const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionID: {
            // mongoose's objectid data type
            type: Schema.Types.ObjectId,
            // if there is not reactionID, a new objectid will be set
            default: () => new Types.ObjectId()
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
            // a getter method to format the timestamp on query
            get: (timestamp) => dateFormat(timestamp)
        }

    }
)

module.exports = reactionSchema;