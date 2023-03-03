import * as delivery from 'services/delivery.service.js';

export const get_some = async (req, res, next) => {
	try {
		let data = await delivery.get_some(req.query);
		res.json(data);
	} catch (err) {
		next(err);
	}
}

export const add_one = async (req, res, next) => {
	try {
		let data = await delivery.add_one(req.body);
		res.json(data);
	} catch (err) {
		next(err);
	}
}

export const delete_one = async (req, res, next) => {
	try {
		let data = await delivery.delete_one(req.query);
		res.json(data);
	} catch (err) {
		next(err);
	}
}
	
export const update_one = async (req, res, next) => {
	try {
		let data = await delivery.update_one(req.query, req.body);
		res.json(data);
	} catch (err) {
		next(err);
	}
}
