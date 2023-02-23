import pg from 'pg';
import db_config from '../configs/db.config.js';
let pool;

const getPool = () => {
	if (pool) return pool;
	pool = new pg.Pool(db_config);
	return pool;
}
        
export default getPool;
