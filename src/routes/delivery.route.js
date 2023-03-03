import express from 'express';
const router = express.Router();
import * as delivery from 'controllers/delivery.controller.js';

// router specific middleware can go here
// such as validation for inputs

router.get('/', delivery.get_some);
router.post('/', delivery.add_one);
router.delete('/', delivery.delete_one);
router.put('/', delivery.update_one);


export default router ;
