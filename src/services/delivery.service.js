import { query } from 'services/db.service.js';

export const get_some = async (query_params) => {
	const search_params = parse_delivery_query_params(query_params);
	
	if ( search_params[0] !== undefined && search_params[1] === undefined ) {
		const { rows } = await query('SELECT * FROM delivery WHERE dosage_id = $1', [search_params[0]]);
		return rows;
	
	} else if ( search_params[0] === undefined && search_params[1] !== undefined ) {
		const { rows } = await query('SELECT * FROM delivery WHERE method_id = $1', [search_params[1]]);
		return rows;
	
	} else if ( search_params[0] !== undefined && search_params[1] !== undefined ) {
		const { rows } = await query('SELECT * FROM delivery WHERE dosage_id = $1 AND method_id = $2', search_params);
		return rows;
	} else {
		const { rows } = await query('SELECT * FROM delivery');
		return rows;
	}
};

export const add_one = async (body) => {
	const inputs = parse_delivery_data_from_body(body);
	const { rows }  = await query('INSERT INTO \
		delivery(dosage_id, method_id) \
		VALUES ($1, $2) \
		RETURNING *', inputs);
	return rows[0];
}

export const delete_one = async (query_params) => {
	const delete_params = parse_delivery_query_params(query_params);
	if ( delete_params.includes(undefined) ) {
		throw new Error("dosage_id and method_id are needed to find a unique row to delete");
	} else {
		const { rows }  = await query('DELETE FROM delivery WHERE dosage_id = $1 AND method_id = $2 RETURNING *', delete_params);
		return rows[0];
	}
}


export const update_one = async (query_params, body) => {
	const update_params = parse_delivery_query_params(query_params);
	if (update_params.includes(undefined) ) {
		throw new Error("dosage_id and method_id are needed to find a unique row to update");
	} else {
		let inputs = parse_delivery_data_from_body(body);
		inputs.push(...update_params);
		const { rows }  = await query('UPDATE delivery \
			SET dosage_id = $1, \
			    method_id = $2 \
			WHERE dosage_id = $3 \
			AND method_id = $4 \
			RETURNING *', inputs);
		return rows[0];
	}
}

const parse_delivery_data_from_body = (body) => {
	return [body.dosage_id, body.method_id];
}

const parse_delivery_query_params = (query_params) => {
	const dosage_id = query_params["dosage_id"];
	const method_id = query_params["method_id"];
	return [dosage_id, method_id];
}

