import express from 'express';
const router = express.Router();
import * as units from 'controllers/units.controller.js';

// router specific middleware can go here
// such as validation for inputs

router.get('/', units.get_all);
router.get('/:id', units.get_one);
router.post('/', units.add_one);
router.delete('/:id', units.delete_one);
router.put('/:id', units.update_one);


export default router ;
