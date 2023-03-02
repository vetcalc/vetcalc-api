import * as animals from '../services/animals.service.js';

const get = async (req, res) => {
	try {
		let data = await animals.get_all();
		res.json(data);
	} catch (err) {
		console.error("Problem getting animals ->", err.message);
        	res.status(500).send({ error: 'Failed to retrieve data.' });
		// next(err) // here is where we would pass to an error hanlding middleware
	}
};

const get_one = async (req, res) => {
	try {
		let data = await animals.get_one(req.params.id);
		res.json(data);
	} catch (err) {
		console.error("Problem getting animal ->", err.message);
        	res.status(500).send({ error: 'Failed to retrieve data.' });
		// next(err) // here is where we would pass to an error hanlding middleware
	}
};

export { get, get_one };
