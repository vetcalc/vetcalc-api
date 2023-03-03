import * as delivery from 'services/delivery.service.js';

const get = async (req, res) => {
	try {
		let data = await delivery.get_all();
		res.json(data);
	} catch (err) {
		next(err);
	}
};

export { get };
