const router = require("express").Router();
const mongoose = require("mongoose");
const Chat = require("../models/chat.model");
router.get("/get/:id", (req, res) => {
  Chat.find({ people: { $elemMatch: { userId: req.params.id } } })
    .then((chats) => res.json(chats))
    .catch((err) => res.send(err));
});
router.get("/specific/get/:id", async (req, res) => {
  let id = req.params.id;
  Chat.findById(id)
    .then((chat) => res.json(chat))
    .catch((err) => res.send(err));
});
router.post("/create/:id", (req, res) => {
  let chatName = req.body.name;
  let creatorName = req.body.username;
  let creatorId = req.params.id;
  let messages = [];
  let admin = [creatorId];
  try {
    if (chatName == "" || chatName.trim().length == 0) {
      throw "Nome não permitido";
    }
    let people = [{ userId: creatorId, username: creatorName }];
    let newChat = new Chat({
      name: chatName,
      people: people,
      messages,
      admin,
    });
    newChat.save().then(() => res.json("Chat criado com sucesso!"));
  } catch (error) {
    res.send(error);
  }
});
router.post("/msg/create/:chatID", async (req, res) => {
  let chatID = req.params.chatID;
  let text = req.body.text;

  try {
    if (text == "" || text.trim().length == 0) throw "Texto não permitido";
    let chatOnDb = await Chat.findById(chatID);
    chatOnDb.messages.push({ ...req.body });
    let response = await Chat.findByIdAndUpdate(chatID, {
      messages: chatOnDb.messages,
    });
    res.json("Mensagem enviada");
  } catch (error) {
    res.json(error);
  }
});
router.post("/people/add/:id", async (req, res) => {
  let chatID = req.params.id;
  let chatOnDb = await Chat.findById(chatID);
  let userToAddObj = { userId: req.body._id, username: req.body.username };
  chatOnDb.people.push(userToAddObj);
  await Chat.findByIdAndUpdate(chatID, { people: chatOnDb.people });
  res.json("Usuário adicionado");
});
module.exports = router;
