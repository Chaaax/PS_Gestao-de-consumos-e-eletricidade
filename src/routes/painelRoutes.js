const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/auth");
const { paineis, certificados, leituras, creditos } = require("../utils/storage");
const axios = require("axios");
const multer = require("multer");
const path = require("path");

// Configuração do multer para guardar certificados PDF
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
  if (file.originalname.endsWith(".pdf")) {
    cb(null, true);
  } else {
    cb(new Error("Apenas ficheiros PDF são permitidos."));
  }
}

});

// Rota para Cliente registar um painel solar
router.post("/registar", verifyToken(["Cliente"]), (req, res) => {
  const { localizacao, potencia } = req.body;

  if (!localizacao || !potencia) {
    return res.status(400).json({ message: "Faltam dados obrigatórios" });
  }

  const novoPainel = {
    id: paineis.length + 1,
    clienteId: req.user.id,
    localizacao,
    potencia,
    validado: false
  };

  paineis.push(novoPainel);

  res.status(201).json({ message: "Painel registado com sucesso", painel: novoPainel });
});

// Rota para Técnico validar e emitir certificado com PDF
router.post("/emitir-certificado", verifyToken(["Tecnico"]), upload.single("certificadoPdf"), (req, res) => {
  const { painelId } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Ficheiro PDF obrigatório." });
  }

  const painel = paineis.find((p) => p.id === parseInt(painelId));
  if (!painel) {
    return res.status(404).json({ message: "Painel não encontrado" });
  }

  if (painel.validado) {
    return res.status(400).json({ message: "Certificado já emitido para este painel" });
  }

  painel.validado = true;

  const certificado = {
    id: certificados.length + 1,
    painelId: painel.id,
    clienteId: painel.clienteId,
    data: new Date().toISOString(),
    ficheiro: req.file.path
  };

  certificados.push(certificado);

  res.status(201).json({ message: "Certificado emitido com sucesso", certificado });
});

// Endpoint para calcular créditos
router.post("/calcular-creditos", verifyToken(["Cliente"]), async (req, res) => {
  const clienteId = req.user.id;

  try {
    const { data } = await axios.get(`http://localhost:4000/producao/${clienteId}`);
    const producaoAtual = data.producao;

    const leituraAnterior = leituras.find(l => l.clienteId === clienteId);
    const producaoAnterior = leituraAnterior ? leituraAnterior.valor : 0;
    const produzidoEsteMes = producaoAtual - producaoAnterior;

    const novaLeitura = {
      clienteId,
      valor: producaoAtual,
      data: new Date().toLocaleString("pt-PT", { timeZone: "Europe/Lisbon" })
    };

    if (leituraAnterior) {
      leituraAnterior.valor = producaoAtual;
      leituraAnterior.data = novaLeitura.data;
    } else {
      leituras.push(novaLeitura);
    }

    creditos.push({
      clienteId,
      quantidade: produzidoEsteMes,
      data: novaLeitura.data
    });

    res.json({ message: "Créditos calculados com sucesso", produzidoEsteMes });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao calcular créditos" });
  }
});

//   Rota para Gestor de Operações monitorizar produção de um cliente
router.get("/monitorizar/:clienteId", verifyToken(["GestorOperacoes"]), async (req, res) => {
  const clienteId = req.params.clienteId;

  try {
    const { data } = await axios.get(`http://localhost:4000/producao/${clienteId}`);
    res.json({
      clienteId,
      producaoAtual: data.producao,
      timestamp: data.timestamp
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao obter produção da API externa" });
  }
});

router.get("/todos", (req, res) => {
  res.json(paineis);
});

module.exports = router;
