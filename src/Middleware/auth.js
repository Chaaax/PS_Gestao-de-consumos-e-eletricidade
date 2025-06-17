const jwt = require("jsonwebtoken");

const verifyToken = (rolesPermitidos = []) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Token em falta" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token inválido" });

    try {
      const decoded = jwt.verify(token, "segredo");
      req.user = decoded;

      if (rolesPermitidos.length && !rolesPermitidos.includes(decoded.papel)) {
        return res.status(403).json({ message: "Acesso negado" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Token inválido ou expirado" });
    }
  };
};

module.exports = verifyToken;
