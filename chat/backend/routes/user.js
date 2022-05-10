const router = require("express").Router();
const User = require("../models/user.model");
router.get("/get/all", (req, res) => {
  User.find().then((users) => res.json(users));
});
router.post("/create", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    if (username == "" || username.trim().length == 0) {
      throw "Nome não permitido.";
    } else if (password == "" || password.trim().length == 0) {
      throw "Senha não permitida.";
    }
    let existentUserOnDb = await User.findOne({ username: username });
    if (existentUserOnDb) {
      throw "Usuário já cadastrado";
    }
    let newUser = new User({ username: username, password: password });
    newUser
      .save()
      .then((user) => res.json(user))
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    res.send(error);
  }
});
router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    if (username == "" || username.trim().length == 0) {
      throw "Nome não permitido.";
    } else if (password == "" || password.trim().length == 0) {
      throw "Senha não permitida.";
    }
    let userOnDb = await User.findOne({ username: username });
    if (!userOnDb) throw "Usuário inexistente";
    if (password == userOnDb.password) {
      res.json(userOnDb);
    } else {
      throw "Credenciais não conferem";
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
