import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

export async function query(sql: string, values?: any[]): Promise<any[]> {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(sql, values);
    return rows;
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
}
