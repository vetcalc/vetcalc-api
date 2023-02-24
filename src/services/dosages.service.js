import getPool from './db.service.js';

const get_all = async () => {
	const pool = getPool();
	const { rows } = await pool.query('SELECT * FROM dosages');
	return rows;
};

export { get_all };
