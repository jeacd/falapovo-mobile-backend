import bcrypt from 'bcryptjs';
import pool from '../db.js';

const createUser = async (name, email, password, isadmin = false) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const query = 'INSERT INTO users (name, email, password, isadmin) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [name, email, hashedPassword, isadmin];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error("Erro ao criar usuário: " + err.message);
  }
};


const authenticateUser = async (email, password) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];

  try {
    const result = await pool.query(query, values);
    const user = result.rows[0];
    
    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("password incorreta.");
    }

    return user;
  } catch (err) {
    throw new Error("Erro na autenticação: " + err.message);
  }
};

export { createUser, authenticateUser };
