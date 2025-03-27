import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Admin@123',
  database: 'chat_systems'
});

export const registerUser = async (username: string, email: string, password: string) => {
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Insert user into the database
  const [rows] = await pool.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword]
  );
  
  return rows;
};


export const loginUser = async (email: string, password: string) => {
  const [rows]: any[] = await pool.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  if (rows.length === 0) {
    throw new Error('Invalid credentials');
  }

  const user = rows[0];

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', {
    expiresIn: '1h',
  });

  return token;
};

module.exports =  pool;