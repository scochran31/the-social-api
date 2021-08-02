const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Username is required!',
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: 'Please enter a valid email address.',
            match: [/.+\@.+..+/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;