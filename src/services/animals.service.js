import { query } from './db.service.js';

const get_all = async () => {
	const { rows } = await query('SELECT * FROM animals');
	return rows;
};

const get_one = async (id) => {
	const { rows }  = await query('SELECT * FROM animals WHERE animal_id = $1', [id]);
	return rows[0];
}

const add_one = async (body) => {
	const inputs = [body.name, body.temperature_low, body.temperature_high, body.heart_rate_low, body.heart_rate_high, body.respiratory_rate_low, body.respiratory_rate_high];
	const { rows }  = await query('INSERT INTO \
		animals(name, temperature_low, temperature_high, heart_rate_low, heart_rate_high, respiratory_rate_low, respiratory_rate_high) \
		VALUES ($1, $2, $3, $4, $5, $6, $7) \
		RETURNING animal_id', inputs);
	return rows[0];
}

const delete_one = async (id) => {
	const { rows }  = await query('DELETE FROM animals WHERE animal_id = $1 RETURNING animal_id', [id]);
	return rows[0];
}


export { 
	get_all,
	get_one,
	add_one,
	delete_one
};
