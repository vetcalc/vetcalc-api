import * as concentrations from '../services/concentrations.service.js';

const get = async (req, res) => {
	try {
		let data = await concentrations.get_all();
		res.json(data);
	} catch (err) {
		console.error("Problem getting concentrations ->", err.message);
        	res.status(500).send({ error: 'Failed to retrieve data.' });
		// next(err) // here is where we would pass to an error hanlding middleware
	}
};

export { get };
