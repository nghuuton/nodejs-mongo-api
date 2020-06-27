const Deck = require("../models/Deck");
const User = require("../models/User");

const index = async (req, res, next) => {
  const decks = await Deck.find({}).populate("owner");
  return res.status(200).json({ decks });
};

const newDeck = async (req, res, next) => {
  const owner = await User.findById(req.value.body.owner);
  const deck = req.value.body;
  delete deck.owner;
  deck.owner = owner._id;
  const newDeck = new Deck(deck);
  await newDeck.save();
  owner.decks.push(newDeck);
  await owner.save();
  return res.status(201).json({ deck: newDeck });
};

const getDeck = async (req, res, next) => {
  const { deckId } = req.value.params;
  const deck = await Deck.findById(deckId);
  return res.status(200).json({ deck });
};

const updateDeck = async (req, res, next) => {
  const { deckId } = req.value.params;
  const { owner } = req.value.body;
  const newDeck = req.value.body;
  /**
   * @function findbyIdAndUpdate
   * @returns [v]
   * @instance Deck
   */
  const result = await Deck.findByIdAndUpdate(deckId, newDeck);
  // console.log("Gía trị body", newDeck, "Từ body", owner, "Khi update", result);
  if (owner) {
    const currentUser = await User.findById(result.owner);
    currentUser.decks.pull(result);
    const newUser = await User.findById(owner);
    newUser.decks.push(result._id);
    await currentUser.save();
    await newUser.save();
    console.log(currentUser.lastname, newUser.lastname);
  }
  return res.status(200).json({ success: true });
};

const deleteDeck = async (req, res, next) => {
  const { deckId } = req.value.params;
  const deck = await Deck.findById(deckId);
  const user = await User.findById(deck.owner);
  await deck.remove();
  user.decks.pull(deck);
  await user.save();
  return res.status(200).json({ success: true });
};

module.exports = {
  index,
  newDeck,
  getDeck,
  updateDeck,
  deleteDeck,
};
