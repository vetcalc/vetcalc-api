import express from 'express';
const router = express.Router();
import * as methods from 'controllers/methods.controller.js';

// router specific middleware can go here
// such as validation for inputs

router.get('/', methods.get_all);
router.get('/:id', methods.get_one);
router.post('/', methods.add_one);
router.delete('/:id', methods.delete_one);
router.put('/:id', methods.update_one);


export default router ;
