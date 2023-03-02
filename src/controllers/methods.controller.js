import * as methods from '../services/methods.service.js';

const get = async (req, res) => {
	try {
		let data = await methods.get_all();
		res.json(data);
	} catch (err) {
		next(err);
	}
};

export { get };
