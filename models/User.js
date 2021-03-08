const { Schema, model } = require('mongoose');
const moment = require('moment');

const UserSchema = new Schema({
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/]     
        },
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
      ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
    },
    { 
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

const User = model('User', UserSchema);

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

module.exports = User;