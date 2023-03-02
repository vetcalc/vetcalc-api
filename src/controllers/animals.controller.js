import * as animals from '../services/animals.service.js';

const get = async (req, res, next) => {
	try {
		let data = await animals.get_all();
		res.json(data);
	} catch (err) {
		next(err);
	}
};

const get_one = async (req, res, next) => {
	try {
		let data = await animals.get_one(req.params.id);
		res.json(data);
	} catch (err) {
        	next(err);
	}
};

export { get, get_one };
