import * as concentrations from 'services/concentrations.service.js';

const get = async (req, res) => {
	try {
		let data = await concentrations.get_all();
		res.json(data);
	} catch (err) {
		next(err);
	}
};

export { get };
