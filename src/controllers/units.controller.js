import * as units from '../services/units.service.js';

const get = async (req, res) => {
	try {
		let data = await units.get_all();
		res.json(data);
	} catch (err) {
		console.error("Problem getting units ->", err.message);
        	res.status(500).send({ error: 'Failed to retrieve data.' });
		// next(err) // here is where we would pass to an error hanlding middleware
	}
};

export { get };
