import dotenv from 'dotenv';
dotenv.config();

const env = process.env;
const db = {
    host: env.VADDB_HOST,
    user: env.VADDB_USER,
    password: env.VADDB_PASSWORD,
    database: env.VADDB_DATABASE,
    port: env.VADDB_PORT,
};

export default db;
