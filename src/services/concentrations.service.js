import { query } from 'services/db.service.js';

export const get_all = async () => {
	const { rows } = await query('SELECT * FROM concentrations');
	return rows;
};

export const get_one = async (id) => {
	const { rows }  = await query('SELECT * FROM concentrations WHERE concentration_id = $1', [id]);
	return rows[0];
}

export const add_one = async (body) => {
	const inputs = parse_concentration_data_from_body(body);
	const { rows }  = await query('INSERT INTO \
		concentrations(name) \
		VALUES ($1, $2, $3) \
		RETURNING concentration_id', inputs);
	return rows[0];
}

export const delete_one = async (id) => {
	const { rows }  = await query('DELETE FROM concentrations WHERE concentration_id = $1 RETURNING concentration_id', [id]);
	return rows[0];
}


export const update_one = async (id, body) => {
	let inputs = parse_concentration_data_from_body(body);
	inputs.push(id);
	const { rows }  = await query('UPDATE concentrations \
		SET value = $1, \
		    unit_id = $2, \
		    dosage_id = $3 \
		WHERE concentration_id = $4 \
		RETURNING concentration_id', inputs);
	return rows[0];
}

const parse_concentration_data_from_body = (body) => {
	return [body.value, body.unit_id, body.dosage_id];
}

