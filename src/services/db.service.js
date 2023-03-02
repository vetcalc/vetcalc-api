import pg from 'pg';
import db_config from '../configs/db.config.js';

const pool = new pg.Pool(db_config);

const getPool = () => {
	if (pool) return pool;
	pool = new pg.Pool(db_config);
	return pool;
}

const query = async (sql_statement, params) => {
	const res = await pool.query(sql_statement, params);
	return res
}

export default getPool;
export { query };
