import { query } from 'services/db.service.js';

export const get_dosages = async (query_params) => {
	const { dosage_id, animal_id, drug_id } = query_params;

	let response = undefined;
	const  my_case = calculate_dosage_filter_case(query_params);
	switch (my_case) {
		case 0:
			response = await query('SELECT * FROM dosages');
			break;
		case 1:
			response = await query('SELECT * FROM dosages WHERE drug_id = $1', [drug_id]);
			break;
		case 2:
			response = await query('SELECT * FROM dosages WHERE animal_id = $1', [animal_id]);
			break;
		case 3:
			response = await query('SELECT * FROM dosages WHERE animal_id = $1 AND drug_id = $2', [animal_id, drug_id]);
			break;
		case 4:
			response = await query('SELECT * FROM dosages WHERE dosage_id = $1', [dosage_id]);
			break;
		case 5:
			response = await query('SELECT * FROM dosages WHERE dosage_id = $1 AND drug_id = $2', [dosage_id, drug_id]);
			break;
		case 6:
			response = await query('SELECT * FROM dosages WHERE dosage_id = $1 AND animal_id = $2', [dosage_id, animal_id]);
			break;
		case 7:
			response = await query('SELECT * FROM dosages WHERE dosage_id = $1 AND animal_id = $2 AND drug_id = $3', [dosage_id, animal_id, drug_id]);
			break;
	}


	const dosages = [];
	for (const dosage of response["rows"]) {
		const new_dosage = await deref_dosage(dosage);
		dosages.push(new_dosage);
	}
	return dosages;

};

const calculate_dosage_filter_case = (filters) => {
	const { dosage_id, animal_id, drug_id } = filters;

	let filter_case = 0;

	if (dosage_id) {
		filter_case += 4;
	}
	if (animal_id) {
		filter_case += 2;
	}
	if (drug_id) {
		filter_case += 1;
	}

	return filter_case
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
