import * as drugs from '../services/drugs.service.js';

const get = async (req, res) => {
	try {
		let data = await drugs.get_all();
		res.json(data);
	} catch (err) {
		next(err);
	}
};

export { get };
