import * as dosages from 'services/dosages.service.js';

const get = async (req, res) => {
	try {
		let data = await dosages.get_all();
		res.json(data);
	} catch (err) {
		next(err);
	}
};

export { get };
