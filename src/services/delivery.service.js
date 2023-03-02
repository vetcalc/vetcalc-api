import { query } from './db.service.js';

const get_all = async () => {
	const { rows } = await query('SELECT * FROM delivery');
	return rows;
};

export { get_all };
