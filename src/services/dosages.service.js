import { query } from 'services/db.service.js';

export const get_some = async (query_params) => {
	const search_params = parse_dosage_query_params(query_params);
	
	if ( search_params[0] !== undefined && search_params[1] === undefined ) {
		const { rows } = await query('SELECT * FROM dosages WHERE animal_id = $1', [search_params[0]]);
		return rows;
	
	} else if ( search_params[0] === undefined && search_params[1] !== undefined ) {
		const { rows } = await query('SELECT * FROM dosages WHERE drug_id = $1', [search_params[1]]);
		return rows;
	
	} else if ( search_params[0] !== undefined && search_params[1] !== undefined ) {
		const { rows } = await query('SELECT * FROM dosages WHERE animal_id = $1 AND drug_id = $2', search_params);
		return rows;
	} else {
		const { rows } = await query('SELECT * FROM dosages');
		return rows;
	}
};

export const get_one = async (id) => {
	const { rows }  = await query('SELECT * FROM dosages WHERE dosage_id = $1', [id]);
	return rows[0];
}

export const add_one = async (body) => {
	const inputs = parse_dosage_data_from_body(body);
	const { rows }  = await query('INSERT INTO \
		dosages(animal_id, drug_id, dose_low, dose_high, dose_unit_id, notes) \
		VALUES ($1, $2, $3, $4, $5, $6) \
		RETURNING dosage_id', inputs);
	return rows[0];
}

export const delete_one = async (id) => {
	const { rows }  = await query('DELETE FROM dosages WHERE dosage_id = $1 RETURNING dosage_id', [id]);
	return rows[0];
}

export const update_one = async (id, body) => {
	let inputs = parse_dosage_data_from_body(body);
	inputs.push(id);
	const { rows }  = await query('UPDATE dosages \
		SET animal_id = $1, \
		    drug_id = $2, \
		    dose_low = $3, \
		    dose_high = $4, \
		    dose_unit_id = $5, \
		    notes = $6 \
		WHERE dosage_id = $7 \
		RETURNING dosage_id', inputs);
	return rows[0];
}

const parse_dosage_data_from_body = (body) => {
	return [body.animal_id, body.drug_id, body.dose_low, body.dose_high, body.dose_unit_id, body.notes];
}

const parse_dosage_query_params = (query_params) => {
	const animal_id = query_params["animal_id"];
	const drug_id = query_params["drug_id"];
	return [animal_id, drug_id];
}

