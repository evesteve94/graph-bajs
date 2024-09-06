import pkg from 'pg';
import dotenv from 'dotenv';
// Load environment variables from the .env file
dotenv.config();
const { Pool } = pkg;
// Create a new PostgreSQL client using environment variables
export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT), // Convert port to number
});
// Testing the database connection
(async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Database connected successfully:', res.rows[0]);
    }
    catch (err) {
        console.error('Database connection error:', err);
    }
})();
