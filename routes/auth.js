import express from 'express';
import { createUser, authenticateUser } from '../models/user.js';

const router = express.Router();


router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
  
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Preencha todos os campos." });
    }
  
    try {
      const user = await createUser(name, email, password);
      const response = { name: user.name, email: user.email, isAdmin: user.isAdmin, id: user.id };
      res.status(201).json({ message: "Usuário registrado com sucesso", response });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Preencha todos os campos." });
  }

  try {
    const user = await authenticateUser(email, password);
    console.log(user);
    res.status(200).json({ message: "Login bem-sucedido", user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

export default router;
