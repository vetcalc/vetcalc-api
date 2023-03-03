import { query } from 'services/db.service.js';

const get_all = async () => {
	const { rows } = await query('SELECT * FROM concentrations');
	return rows;
};

export { get_all };
