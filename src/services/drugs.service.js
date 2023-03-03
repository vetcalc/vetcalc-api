import { query } from './db.service.js';

export const get_all = async () => {
	const { rows } = await query('SELECT * FROM drugs');
	return rows;
};

export const get_one = async (id) => {
	const { rows }  = await query('SELECT * FROM drugs WHERE drug_id = $1', [id]);
	return rows[0];
}

export const add_one = async (body) => {
	const inputs = parse_drug_data_from_body(body);
	const { rows }  = await query('INSERT INTO \
		drugs(name) \
		VALUES ($1) \
		RETURNING drug_id', inputs);
	return rows[0];
}

export const delete_one = async (id) => {
	const { rows }  = await query('DELETE FROM drugs WHERE drug_id = $1 RETURNING drug_id', [id]);
	return rows[0];
}


export const update_one = async (id, body) => {
	let inputs = parse_drug_data_from_body(body);
	inputs.push(id);
	const { rows }  = await query('UPDATE drugs \
		SET name = $1, \
		WHERE drug_id = $2 \
		RETURNING drug_id', inputs);
	return rows[0];
}

const parse_drug_data_from_body = (body) => {
	return [body.name];
}

