import { query } from 'services/db.service.js';

export const get_all = async () => {
	const { rows } = await query('SELECT * FROM methods');
	return rows;
};

export const get_one = async (id) => {
	const { rows }  = await query('SELECT * FROM methods WHERE method_id = $1', [id]);
	return rows[0];
}

export const add_one = async (body) => {
	const inputs = parse_method_data_from_body(body);
	const { rows }  = await query('INSERT INTO \
		methods(name) \
		VALUES ($1) \
		RETURNING method_id', inputs);
	return rows[0];
}

export const delete_one = async (id) => {
	const { rows }  = await query('DELETE FROM methods WHERE method_id = $1 RETURNING method_id', [id]);
	return rows[0];
}


export const update_one = async (id, body) => {
	let inputs = parse_method_data_from_body(body);
	inputs.push(id);
	const { rows }  = await query('UPDATE methods \
		SET name = $1, \
		WHERE method_id = $2 \
		RETURNING method_id', inputs);
	return rows[0];
}

const parse_method_data_from_body = (body) => {
	return [body.name];
}

