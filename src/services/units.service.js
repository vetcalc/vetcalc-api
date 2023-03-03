import { query } from 'services/db.service.js';

export const get_all = async () => {
	const { rows } = await query('SELECT * FROM units');
	return rows;
};

export const get_one = async (id) => {
	const { rows }  = await query('SELECT * FROM units WHERE unit_id = $1', [id]);
	return rows[0];
}

export const add_one = async (body) => {
	const inputs = parse_unit_data_from_body(body);
	const { rows }  = await query('INSERT INTO \
		units(name) \
		VALUES ($1) \
		RETURNING unit_id', inputs);
	return rows[0];
}

export const delete_one = async (id) => {
	const { rows }  = await query('DELETE FROM units WHERE unit_id = $1 RETURNING unit_id', [id]);
	return rows[0];
}


export const update_one = async (id, body) => {
	let inputs = parse_unit_data_from_body(body);
	inputs.push(id);
	const { rows }  = await query('UPDATE units \
		SET name = $1, \
		WHERE unit_id = $2 \
		RETURNING unit_id', inputs);
	return rows[0];
}

const parse_unit_data_from_body = (body) => {
	return [body.name];
}

