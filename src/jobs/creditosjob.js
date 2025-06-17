const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const creditosPath = path.join(__dirname, '../data/creditos.json');

// Simula leitura dos dados de um cliente
function simularLeituraCliente(userId) {
  const produzido = Math.floor(Math.random() * 200) + 300; // 300–500 kWh
  const consumido = Math.floor(Math.random() * 200) + 250; // 250–450 kWh
  return { userId, produzido, consumido, email: "cliente@gmail.com", nome: "João Silva" };
}

// Lê e escreve dados
function lerDados() {
  if (!fs.existsSync(creditosPath)) return [];
  return JSON.parse(fs.readFileSync(creditosPath));
}

function escreverDados(dados) {
  fs.writeFileSync(creditosPath, JSON.stringify(dados, null, 2));
}

// Tarefa agendada mensal
cron.schedule('*/500 * * * * *', () => {
  const userId = 1;
  const { produzido, consumido, email, nome } = simularLeituraCliente(userId);

  const excedente = Math.max(0, produzido - consumido);
  const dados = lerDados();

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

  console.log(`[CRON] Créditos processados para o utilizador ${userId} (${nome})`);
  console.log(`[CRON] Produzido: ${produzido} kWh | Consumido: ${consumido} kWh | Excedente: ${excedente} kWh`);
}, {
  timezone: "Europe/Lisbon"
});
