import * as concentrations from 'services/concentrations.service.js';

export const get_all = async (req, res, next) => {
	try {
		let data = await concentrations.get_all();
		res.json(data);
	} catch (err) {
		next(err);
	}
}

export const get_one = async (req, res, next) => {
	try {
		let data = await concentrations.get_one(req.params.id);
		res.json(data);
	} catch (err) {
		next(err);
	}
}

export const add_one = async (req, res, next) => {
	try {
		let data = await concentrations.add_one(req.body);
		res.json(data);
	} catch (err) {
		next(err);
	}
}

export const delete_one = async (req, res, next) => {
	try {
		let data = await concentrations.delete_one(req.params.id);
		res.json(data);
	} catch (err) {
		next(err);
	}
}
	
export const update_one = async (req, res, next) => {
	try {
		let data = await concentrations.update_one(req.params.id, req.body);
		res.json(data);
	} catch (err) {
		next(err);
	}
}
