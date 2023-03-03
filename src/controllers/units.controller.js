import * as units from 'services/units.service.js';

export const get_all = async (req, res, next) => {
	try {
		let data = await units.get_all();
		res.json(data);
	} catch (err) {
		next(err);
	}
}

export const get_one = async (req, res, next) => {
	try {
		let data = await units.get_one(req.params.id);
		res.json(data);
	} catch (err) {
		next(err);
	}
}

export const add_one = async (req, res, next) => {
	try {
		let data = await units.add_one(req.body);
		res.json(data);
	} catch (err) {
		next(err);
	}
}

export const delete_one = async (req, res, next) => {
	try {
		let data = await units.delete_one(req.params.id);
		res.json(data);
	} catch (err) {
		next(err);
	}
}
	
export const update_one = async (req, res, next) => {
	try {
		let data = await units.update_one(req.params.id, req.body);
		res.json(data);
	} catch (err) {
		next(err);
	}
}
