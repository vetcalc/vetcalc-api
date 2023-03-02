import express from 'express';
const router = express.Router();
import { get,  get_one} from '../controllers/animals.controller.js';

// router specific middleware can go here
// such as validation for inputs

router.get('/', get);
router.get('/:id', get_one);

export default router ;
