const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
    {
        reactionId: [
            {
                type: Schema.Types.ObjectId(),
                default: () => new Types.ObjectId()
            }
        ],
        reactionBody: {
            type: String,
            required: "Let's hear that reaction!",
            maxLength: 240
        },
        username: {
            type: String,
            required: true,
        },
        dateCreated: {
            type: Date,
            default: Date.new,
            get: dateCreated => dateFormat(dateCreatedVal)
        }
    }
);

const thoughtSchema = new Schema(
    {
        thoughtBubble: {
            type: String,
            required: 'Words in thought bubble please!',
            minLength: 1,
            maxLength: 120
        },
        dateCreated: {
            type: Date,
            default: Date.new,
            get: dateCreated => dateFormat(dateCreatedVal)
        },
        username: {
            type: Schema.Types.ObjectId(),
            required: true,
            ref: 'User'
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        }
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;