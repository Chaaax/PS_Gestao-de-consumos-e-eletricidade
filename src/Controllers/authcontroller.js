const jwt = require("jsonwebtoken");
const { addUser, findUserByEmail } = require("../Models/User");

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username e password são obrigatórios." });
  }

const users = [
  { id: 1, username: "cliente", password: "1234", papel: "Cliente" },
  { id: 2, username: "tecnico", password: "1234", papel: "Tecnico" },
  { id: 3, username: "gestor", password: "1234", papel: "GestorOperacoes" }
];


  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas." });
  }

  const token = jwt.sign({ id: user.id, papel: user.papel }, process.env.JWT_SECRET || "segredo", {
    expiresIn: "10h"
  });

  res.json({ token });
};

const register = (req, res) => {
  const { email, password, nome } = req.body;

  if (!email || !password || !nome) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  const existente = findUserByEmail(email);
  if (existente) {
    return res.status(409).json({ message: "Utilizador já existe." });
  }

  const novoUtilizador = {
    id: Date.now(), // ID simples
    email,
    password,
    nome,
    papel: "Cliente"
  };

  addUser(novoUtilizador);

  res.status(201).json({ message: "Utilizador registado com sucesso!" });
};


module.exports = { login, register };
