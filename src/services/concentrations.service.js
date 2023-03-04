import { query } from 'services/db.service.js';

export const get_some = async (query_params) => {
	const search_params = parse_concentration_query_params(query_params);
	
	if ( search_params[0] !== undefined ) {
		const { rows } = await query('SELECT * FROM concentrations WHERE dosage_id = $1', [search_params[0]]);
		return rows;
	} else {
		const { rows } = await query('SELECT * FROM concentrations');
		return rows;
	}

};

export const get_one = async (id) => {
	const { rows }  = await query('SELECT * FROM concentrations WHERE concentration_id = $1', [id]);
	return rows[0];
}

export const add_one = async (body) => {
	const inputs = parse_concentration_data_from_body(body);
	const { rows }  = await query('INSERT INTO \
		concentrations(value, unit_id, dosage_id) \
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

const parse_concentration_query_params = (query_params) => {
	const dosage_id = query_params["dosage_id"];
	return [dosage_id];
}


