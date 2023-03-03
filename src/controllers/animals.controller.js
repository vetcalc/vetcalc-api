import * as animals from 'services/animals.service.js';

export const get_all = async (req, res, next) => {
	try {
		let data = await animals.get_all();
		res.json(data);
	} catch (err) {
		next(err);
	}
}

export const get_one = async (req, res, next) => {
	try {
		let data = await animals.get_one(req.params.id);
		res.json(data);
	} catch (err) {
		next(err);
	}
}

export const add_one = async (req, res, next) => {
	try {
		let data = await animals.add_one(req.body);
		res.json(data);
	} catch (err) {
		next(err);
	}
}

export const delete_one = async (req, res, next) => {
	try {
		let data = await animals.delete_one(req.params.id);
		res.json(data);
	} catch (err) {
		next(err);
	}
}
	
export const update_one = async (req, res, next) => {
	try {
		let data = await animals.update_one(req.params.id, req.body);
		res.json(data);
	} catch (err) {
		next(err);
	}
}
