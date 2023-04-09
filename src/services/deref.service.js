import { query } from 'services/db.service.js';

export const get_dosages = async (query_params) => {
	const { dosage_id, animal_id, drug_id } = query_params;

	const { rows }  = await query('SELECT * FROM dosages WHERE dosage_id = $1', [dosage_id]);

	const dosages = [];
	for (const dosage of rows) {
		const new_dosage = await deref_dosage(dosage);
		dosages.push(new_dosage);
	}
	return dosages;

};

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
		console.log(concentration);
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
