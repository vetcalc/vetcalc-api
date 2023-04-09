import { query } from 'services/db.service.js';

export const get_dosages = async (query_params) => {
	const filters = gather_filters(query_params);

	let sql_statement = 'SELECT * FROM dosages';
	const sql_statement_values = [];

	// create the sql statement from the query params
	if (filters.length == 0) {
		// do nothing
	}
	else {
		sql_statement += ' WHERE';

		let first_filter_added = false;
		let current_index = 1;

		for (const filter of filters) {
			if (first_filter_added) {
				sql_statement += ` AND ${filter.name} = \$${current_index}`
			}
			else {
				sql_statement += ` ${filter.name} = \$${current_index}`
				first_filter_added = true;
			}
				
			sql_statement_values.push(filter.value);
			current_index++;
		}
	}

	const response = await query(sql_statement, sql_statement_values);

	// perform the dereferencing after deciding what dosages need processing
	const dosages = [];
	for (const dosage of response["rows"]) {
		const new_dosage = await deref_dosage(dosage);
		dosages.push(new_dosage);
	}

	return dosages;

};

const gather_filters = (params) => {
	const { dosage_id, animal_id, drug_id } = params;
	const filters = [];

	if (dosage_id) {
		filters.push({
			"name": "dosage_id",
			"value": dosage_id,
		})
	}
	if (animal_id) {
		filters.push({
			"name": "animal_id",
			"value": animal_id,
		})
	}
	if (drug_id) {
		filters.push({
			"name": "drug_id",
			"value": drug_id,
		})
	}

	return filters;
}

const deref_dosage = async (dosage) => {

	// deref animal_id
	const animal_id = dosage["animal_id"];
	const animal_response = await query('select * from animals where animal_id = $1', [animal_id]);
	const animal = animal_response["rows"][0];
	delete dosage.animal_id;
	dosage["animal"] = animal;
	
	// deref drug_id
	const drug_id = dosage["drug_id"];
	const drug_response = await query('select * from drugs where drug_id = $1', [drug_id]);
	const drug = drug_response["rows"][0];
	delete dosage.drug_id;
	dosage["drug"] = drug;

	// deref dose_unit_id
	const dose_unit_id = dosage["dose_unit_id"];
	const dose_unit_response = await query('select * from units where unit_id = $1', [dose_unit_id]);
	const dose_unit = dose_unit_response["rows"][0];
	delete dosage.dose_unit_id;
	dosage["dose_unit"] = dose_unit;

	// deref concentrations
	const concentrations_response = await query('select * from concentrations where dosage_id = $1', [dosage["dosage_id"]]);
	const concentrations = concentrations_response["rows"];
	for (const concentration of concentrations) {
		const unit_response = await query('select * from units where unit_id = $1', [ concentration["unit_id"] ]);
		const unit = unit_response["rows"][0];
		delete concentration.unit_id;
		concentration["unit"] = unit;
	}
	dosage["concentrations"] = concentrations;

	// deref methods
	const method_sql_statement = `select methods.* from delivery 
		join dosages on dosages.dosage_id = delivery.dosage_id 
		join methods on methods.method_id = delivery.method_id 
		where dosages.dosage_id = $1`;
	const method_response = await query(method_sql_statement, [dosage["dosage_id"]]);
	const methods = method_response["rows"];
	dosage["methods"] = methods;

	return dosage;
}
