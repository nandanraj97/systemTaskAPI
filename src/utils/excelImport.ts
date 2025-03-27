import ExcelJS from 'exceljs';

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Admin@123',
  database: 'chat_systems'
});


export const importChatHistory = async (filePath: string, userId: number) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(1);
  
  const chatData :any= [];
  if(worksheet) {
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header row
        const message = row.getCell(1).text;
        chatData.push({ user_id: userId, message });
      });
  }
  

  // Insert chat data into database
  for (const chat of chatData) {
    await pool.execute('INSERT INTO chat_history (user_id, message) VALUES (?, ?)', [
      chat.user_id, chat.message,
    ]);
  }
};
