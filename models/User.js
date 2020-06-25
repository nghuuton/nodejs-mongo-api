const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  decks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Deck",
    },
  ],
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
