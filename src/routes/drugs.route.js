import express from 'express';
const router = express.Router();
import * as drugs from 'controllers/drugs.controller.js';

// router specific middleware can go here
// such as validation for inputs

router.get('/', drugs.get_all);
router.get('/:id', drugs.get_one);
router.post('/', drugs.add_one);
router.delete('/:id', drugs.delete_one);
router.put('/:id', drugs.update_one);


export default router ;
