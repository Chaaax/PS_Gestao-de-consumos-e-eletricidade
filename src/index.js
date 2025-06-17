require('dotenv').config();
require('./jobs/creditosjob');
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const painelRoutes = require('./routes/painelRoutes'); 
const creditosRoutes = require('./routes/creditosRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/painel', painelRoutes); 
app.use('/creditos', creditosRoutes);

app.get('/', (req, res) => {
  res.send('API solar-manager ativa');
});

app.post('/teste', (req, res) => {
  res.json({ mensagem: "Rota de teste está a funcionar!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));
