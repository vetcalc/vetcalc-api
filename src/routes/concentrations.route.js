import express from 'express';
const router = express.Router();
import * as concentrations from 'controllers/concentrations.controller.js';

// router specific middleware can go here
// such as validation for inputs

router.get('/', concentrations.get_all);
router.get('/:id', concentrations.get_one);
router.post('/', concentrations.add_one);
router.delete('/:id', concentrations.delete_one);
router.put('/:id', concentrations.update_one);


export default router ;
