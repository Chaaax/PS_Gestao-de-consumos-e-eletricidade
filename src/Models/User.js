// Simulação simples em memória
const users = [];

function findUserByEmail(email) {
  return users.find((u) => u.email === email);
}

function addUser(user) {
  users.push(user);
}

module.exports = { users, findUserByEmail, addUser };
