const fs = require('fs');
const path = require('path');

const creditosPath = path.join(__dirname, '../data/creditos.json');

function lerDados() {
  if (!fs.existsSync(creditosPath)) return [];
  return JSON.parse(fs.readFileSync(creditosPath));
}

function escreverDados(dados) {
  fs.writeFileSync(creditosPath, JSON.stringify(dados, null, 2));
}

exports.calcularCreditos = (req, res) => {
  const { userId, produzido, consumido, email, nome } = req.body;

  const excedente = Math.max(0, produzido - consumido);
  let dados = lerDados();

  const acumulado = dados
    .filter(d => d.userId === userId)
    .reduce((acc, curr) => acc + curr.excedente, 0) + excedente;

  const entrada = {
    userId,
    produzido,
    consumido,
    excedente,
    acumulado,
    data: new Date().toISOString().slice(0, 10)
  };

  dados.push(entrada);
  escreverDados(dados);

  res.json({
    mensagem: 'Créditos calculados com sucesso (sem envio de email).',
    entrada
  });
};

exports.getCreditos = (req, res) => {
  const userId = req.params.userId;
  const dados = lerDados().filter(d => d.userId == userId);
  res.json(dados);
};

