import express from 'express';
const router = express.Router();
import * as deref from 'controllers/deref.controller.js';


/** @swagger
 * tags:
 *   name: deref
 *   description: GET methods for dereferencing the entities
 */

/** @swagger
 * /deref/dosages:
 *   get:
 *     tags: [deref]
 *     summary: Get dosages dereferenced
 *     description: an array of dosage objects with its children dereferenced
 *     operationId: getDerefDosages
 *     parameters:
 *       - name: dosage_id
 *         in: query
 *         description: dosage_id to filter by
 *         schema:
 *           type: integer
 *           format: int64
 *       - name: animal_id
 *         in: query
 *         description: animal_id to filter by
 *         schema:
 *           type: integer
 *           format: int64
 *       - name: drug_id
 *         in: query
 *         description: drug_id to filter by
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *       '400':
 *         description: Problem with request
 */
router.get('/dosages', deref.get_dosages);

/** @swagger
 * /deref/concentrations:
 *   get:
 *     tags: [deref]
 *     summary: Get concentrations dereferenced
 *     description: an array of concentration objects with its children dereferenced
 *     operationId: getDerefConcentrations
 *     parameters:
 *       - name: concentration_id
 *         in: query
 *         description: concentration_id to filter by
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *       '400':
 *         description: Problem with request
 */
router.get('/concentrations', deref.get_concentrations);

export default router ;
