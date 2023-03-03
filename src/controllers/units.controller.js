import * as units from 'services/units.service.js';

const get = async (req, res) => {
	try {
		let data = await units.get_all();
		res.json(data);
	} catch (err) {
		next(err);
	}
};

export { get };
