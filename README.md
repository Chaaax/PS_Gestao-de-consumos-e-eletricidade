<<<<<<< HEAD
# ProjetoPS_Sprint1-2-3-4

# ☀Sistema de Gestão de Produção e Créditos de Energia Solar

Este projeto foi desenvolvido no âmbito da UC Programação no Servidor. Está organizado por sprints funcionais que refletem as várias etapas do desenvolvimento.

---

## 🚀 Funcionalidades por Sprint

### ✅ Sprint 1 — Autenticação de Utilizadores (JWT)
- Implementação de um sistema de login seguro com **JSON Web Tokens**.
- Permite o controlo de acesso a funcionalidades protegidas da aplicação.
- Suporte a múltiplos papéis de utilizador: `Cliente`, `Técnico`, `Gestor`.

### ✅ Sprint 2 — Registo de Instalação de Painéis
- Os **clientes** podem registar a instalação de painéis solares, incluindo:
  - Dados técnicos da instalação
  - Localização
- Um **técnico certificado** valida a instalação e emite o **certificado de produtor**.
- O certificado é guardado e associado ao cliente.

### ✅ Sprint 3 — Monitorização da Produção (API Simulada)
- A aplicação liga-se a uma **API de simulação** que gera valores aleatórios de produção.
- Esta API representa a leitura em tempo real do sistema instalado no cliente.
- Cada cliente tem os seus valores de produção monitorizados e registados.

### ✅ Sprint 4 — Contabilização Automática de Créditos de Energia
- O sistema calcula automaticamente os créditos de energia todos os meses.
- A lógica considera:
  - Energia produzida vs consumida
  - Excedente mensal (em kWh)
  - Créditos acumulados
- Os dados são guardados com histórico no ficheiro `creditos.json`.
- Um **cron job** (`node-cron`) executa esta tarefa automaticamente no **dia 1 de cada mês**.
- (Opcional) Envio de email com resumo ao cliente (desativado por agora).

---

## 🧪 Como correr o projeto

```bash
# Instalar dependências
npm install

# Correr o servidor
npm start
node src/index.js

=======
# PS_Gestao-de-consumos-e-eletricidade
Software de gestão de consumos e produção de eletricidade
>>>>>>> 7f35e1eb0e6e33ac0fbb9fd922f90b6598f1768c
