const Deck = require("../models/Deck");
const User = require("../models/User");

const index = async (req, res, next) => {
  const decks = await Deck.find({});
  return res.status(200).json({ decks });
};

const newDeck = async (req, res, next) => {
  const owner = await User.findById(req.body.owner);
  console.log(owner);
  const deck = req.body;
  delete deck.owner;
  deck.owner = owner._id;
  const newDeck = new Deck(deck);
  await newDeck.save();
  owner.decks.push(newDeck);
  await owner.save();
  return res.status(201).json({ deck: newDeck });
};

const getDeck = async (req, res, next) => {
  const { deckId } = req.params;
  const deck = await Deck.findById(deckId);
  return res.status(200).json({ deck });
};

module.exports = {
  index,
  newDeck,
  getDeck,
};
