const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
    {
        reactionId: [
            {
                type: Schema.Types.ObjectId,
                default: () => new Types.ObjectId()
            }
        ],
        reactionBody: {
            type: String,
            required: "Let's hear that reaction!",
            maxLength = 240
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
    });