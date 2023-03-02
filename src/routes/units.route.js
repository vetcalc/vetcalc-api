import express from 'express';
const router = express.Router();
import { get } from '../controllers/units.controller.js';

// router specific middleware can go here
// such as validation for inputs

router.get('/', get);

export default router ;