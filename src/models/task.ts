import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Admin@123',
  database: 'chat_systems'
});


export const getTasks = async (userId: number, filter: string) => {
    let query = 'SELECT * FROM tasks WHERE user_id = ?';
    const params = [userId];
  
    if (filter === 'completed') {
      query += ' AND is_completed = TRUE';
    } else if (filter === 'pending') {
      query += ' AND is_completed = FALSE';
    }
  
    const [rows] = await pool.execute(query, params);
    return rows;
  };
  