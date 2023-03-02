import express from 'express';
const router = express.Router();
import * as animals from '../controllers/animals.controller.js';

// router specific middleware can go here
// such as validation for inputs

router.get('/', animals.get);
router.get('/:id', animals.get_one);
router.post('/', animals.add_one);
router.delete('/:id', animals.delete_one);

export default router ;
