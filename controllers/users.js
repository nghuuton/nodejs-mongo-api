/**
 * We can interact with mongoose in three different way.
 * [x] Callback
 * [x] Promise
 * [x] Aync/Await
 */
const User = require("../models/User");
const Deck = require("../models/Deck");
// const index = (req, res, next) => {
//   // Callback
//   User.find({}, (err, users) => {
//     if (err) next(e);

//     return res.status(200).json({ users });
//   });
// };

// const index = (req, res, next) => {
//   // Promises way
//   User.find({})
//     .then((users) => {
//       return res.status(200).json({ users });
//     })
//     .catch((err) => {
//       next(err);
//     });
// };

const index = async (req, res, next) => {
  const users = await User.find({});
  // throw new Error("Ramdom Error");
  return res.status(200).json({ users });
};

// const newUser = (req, res, next) => {
//   const newUser = new User(req.body);
//   newUser.save((err, user) => {
//     console.error(err);
//     console.log(user);
//   });
// };

// const newUser = (req, res, next) => {
//   const newUser = new User(req.body);
//   newUser
//     .save()
//     .then((user) => {
//       return res.status(200).json({ user });
//     })
//     .catch((err) => {
//       next(err);
//     });
// };

const newUser = async (req, res, next) => {
  const newUser = new User(req.value.body);
  await newUser.save();
  return res.status(201).json({ user: newUser });
};

const newUserDeck = async (req, res, next) => {
  const { userId } = req.params;
  const newDeck = new Deck(req.body);
  const user = await User.findById(userId);
  newDeck.owner = user._id;
  await newDeck.save();
  user.decks.push(newDeck);
  await user.save();
  return res.status(201).json({ deck: newDeck });
};

const getUser = async (req, res, next) => {
  const { userId } = req.value.params;
  const user = await User.findById(userId);
  return res.status(200).json({ user });
};

const getUserDeck = async (req, res, next) => {
  const { userId } = req.value.params;
  const user = await User.findById(userId).populate("decks");
  return res.status(200).json({ decks: user.decks });
};

const replaceUser = async (req, res, next) => {
  const { userId } = req.value.params;
  const newUser = req.value.body;
  const result = await User.findByIdAndUpdate(userId, newUser);
  return res.status(200).json({ success: true });
};

const updateUser = async (req, res, next) => {
  const { userId } = req.value.params;
  const newUser = req.value.body;
  const result = await User.findByIdAndUpdate(userId, newUser);
  return res.status(200).json({ success: true });
};
module.exports = {
  index,
  newUser,
  newUserDeck,
  getUser,
  getUserDeck,
  replaceUser,
  updateUser,
};
