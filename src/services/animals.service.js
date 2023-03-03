import { query } from 'services/db.service.js';

export const get_all = async () => {
	const { rows } = await query('SELECT * FROM animals');
	return rows;
};

export const get_one = async (id) => {
	const { rows }  = await query('SELECT * FROM animals WHERE animal_id = $1', [id]);
	return rows[0];
}

export const add_one = async (body) => {
	const inputs = parse_animal_data_from_body(body);
	const { rows }  = await query('INSERT INTO \
		animals(name, temperature_low, temperature_high, heart_rate_low, heart_rate_high, respiratory_rate_low, respiratory_rate_high) \
		VALUES ($1, $2, $3, $4, $5, $6, $7) \
		RETURNING animal_id', inputs);
	return rows[0];
}

export const delete_one = async (id) => {
	const { rows }  = await query('DELETE FROM animals WHERE animal_id = $1 RETURNING animal_id', [id]);
	return rows[0];
}


export const update_one = async (id, body) => {
	let inputs = parse_animal_data_from_body(body);
	inputs.push(id);
	const { rows }  = await query('UPDATE animals \
		SET name = $1, \
			temperature_low = $2, \
			temperature_high = $3, \
			heart_rate_low = $4, \
			heart_rate_high = $5, \
			respiratory_rate_low = $6, \
			respiratory_rate_high = $7 \
		WHERE animal_id = $8 \
		RETURNING animal_id', inputs);
	return rows[0];
}

const parse_animal_data_from_body = (body) => {
	return [body.name, body.temperature_low, body.temperature_high, body.heart_rate_low, body.heart_rate_high, body.respiratory_rate_low, body.respiratory_rate_high];
}

