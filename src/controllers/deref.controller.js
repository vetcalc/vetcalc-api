import * as deref from 'services/deref.service.js';

export const get_dosages = async (req, res, next) => {
	try {
		let data = await deref.get_dosages(req.query);
		res.json(data);
	} catch (err) {
		next(err);
	}
}
