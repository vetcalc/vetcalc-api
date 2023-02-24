import * as dosages from '../services/dosages.service.js';

const get = async (req, res) => {
	try {
		let data = await dosages.get_all();
		res.json(data);
	} catch (err) {
		console.error("Problem getting dosages ->", err.message);
        	res.status(500).send({ error: 'Failed to retrieve data.' });
		// next(err) // here is where we would pass to an error hanlding middleware
	}
};

export { get };
