import express from 'express';
const router = express.Router();
import * as dosages from 'controllers/dosages.controller.js';

// router specific middleware can go here
// such as validation for inputs

router.get('/', dosages.get_all);
router.get('/:id', dosages.get_one);
router.post('/', dosages.add_one);
router.delete('/:id', dosages.delete_one);
router.put('/:id', dosages.update_one);


export default router ;
