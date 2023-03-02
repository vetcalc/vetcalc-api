import * as animals from '../services/animals.service.js';

const get = async (req, res, next) => {
	try {
		let data = await animals.get_all();
		res.json(data);
	} catch (err) {
		next(err);
	}
}

const get_one = async (req, res, next) => {
	try {
		let data = await animals.get_one(req.params.id);
		res.json(data);
	} catch (err) {
		next(err);
	}
}

const add_one = async (req, res, next) => {
	try {
		let data = await animals.add_one(req.body);
		res.json(data);
	} catch (err) {
		next(err);
	}
}

const delete_one = async (req, res, next) => {
	try {
		let data = await animals.delete_one(req.params.id);
		res.json(data);
	} catch (err) {
		next(err);
	}
}
	

export { get, get_one, add_one, delete_one};
