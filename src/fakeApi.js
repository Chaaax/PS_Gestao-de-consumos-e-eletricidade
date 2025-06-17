const express = require("express");
const app = express();
const PORT = 4000; // usa uma porta diferente da principal

// Simula a produção em kWh para cada cliente
app.get("/producao/:clienteId", (req, res) => {
  const { clienteId } = req.params;

  // Gera um valor aleatório entre 100 e 500 kWh
  const producao = Math.floor(Math.random() * 400) + 100;

  res.json({
    clienteId,
    producao,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Fake API de produção a correr na porta ${PORT}`);
});
