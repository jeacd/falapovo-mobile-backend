import { createUser, authenticateUser } from '../models/user.js';

export const register = async (req, res) => {
    const { name, email, password, isadmin = false } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Preencha todos os campos." });
    }
  
    try {
      const user = await createUser(name, email, password, isadmin);
      const response = { name: user.name, email: user.email, isadmin: user.isadmin, id: user.id };
      res.status(201).json({ message: "Usuário registrado com sucesso", response });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: "Preencha todos os campos." });
    }
  
    try {
      const user = await authenticateUser(email, password);
      res.status(200).json({ message: "Login bem-sucedido", user });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
};