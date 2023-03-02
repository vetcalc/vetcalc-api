import { query } from './db.service.js';

const get_all = async () => {
	const { rows } = await query('SELECT * FROM animals');
	return rows;
};

const get_one = async (id) => {
	const { rows }  = await query('SELECT * FROM animals WHERE animal_id = $1', [id]);
	return rows[0];
}

export { 
	get_all,
	get_one
};
