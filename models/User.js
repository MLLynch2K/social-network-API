const { Schema, model } = require("mongoose");
const Thought = require("./thought");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { toJSON: { virtuals: true }, id: false }
);

UserSchema.post("findOneAndDelete", function (doc) {
  const userThoughtArr = doc.thoughts;
  console.log(userThoughtArr);

  Thought.deleteMany({ _id: { $in: userThoughtArr } })
    .then((result) => console.log("Thoughts deleted!", result))
    .catch((err) => console.log(err));
});

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
