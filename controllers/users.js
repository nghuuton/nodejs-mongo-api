/**
 * We can interact with mongoose in three different way.
 * [x] Callback
 * [x] Promise
 * [x] Aync/Await
 */
const User = require("../models/User");

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
  const newUser = new User(req.body);
  await newUser.save();
  return res.status(201).json({ user: newUser });
};

const getUser = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  return res.status(200).json({ user });
};
const replaceUser = async (req, res, next) => {};
const updateUser = async (req, res, next) => {};
module.exports = {
  index,
  newUser,
  getUser,
  replaceUser,
  updateUser,
};
