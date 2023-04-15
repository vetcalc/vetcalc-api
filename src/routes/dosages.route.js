import express from 'express';
const router = express.Router();
import * as dosages from 'controllers/dosages.controller.js';

/** @swagger
 * tags:
 *   name: dosages
 *   description: All about dosages
 */

/** @swagger
 * components:
 *   schemas:
 *     dosage:
 *       type: object
 *       required: [animal_id, drug_id, dose_low, dose_high, dose_unit_id, notes]
 *       properties:
 *         dosage_id:
 *           type: integer
 *           format: int64
 *           example: 10
 *         animal_id:
 *           type: integer
 *           format: int64
 *           example: 1
 *         drug_id:
 *           type: integer
 *           format: int64
 *           example: 1
 *         dose_low:
 *           type: number
 *           format: float
 *           example: 0.02
 *         dose_high:
 *           type: number
 *           format: float
 *           example: 0.05
 *         dose_unit_id:
 *           type: integer
 *           format: int64
 *           example: 1
 *         notes:
 *           type: string
 *           example: Don't give to a slug
 */
    
/** @swagger
 * components:
 *   requestBodies:
 *     dosage:
 *       description: dosage object that will be added to database
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/dosage'
 *       required: true
 */    


/** @swagger
 * /dosages:
 *   get:
 *     tags: [dosages]
 *     summary: Filter for one or more dosages
 *     description: Filter dosages by animal_id, drug_id, or get all of them by default 
 *     operationId: getdosages
 *     parameters:
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
 *               items:
 *                 $ref: '#/components/schemas/dosage'          
 *       '400':
 *         description: Problem with request
 */
router.get('/', dosages.get_some);


/** @swagger
 * /dosages:
 *   post:
 *     tags: [dosages]
 *     summary: Add an dosage
 *     description: Add an dosage to the database to be used in dosages
 *     operationId: postdosage
 *     requestBody:
 *       $ref: '#components/requestBodies/dosage'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dosage_id:
 *                   type: integer
 *                   format: int64
 *       '400':
 *         description: Problem with request
 *       '511':
 *         description: Need authentication
 *     security:
 *       - api_key: []
 */
router.post('/', dosages.add_one);


/** @swagger
 * /dosages/{id}:
 *   get:
 *     tags: [dosages]
 *     summary: Get a single dosage
 *     description: get one dosage by its ID
 *     operationId: getdosage
 *     parameters:
 *       - name: id
 *         in: path
 *         description: dosage id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/dosage'
 *       '400':
 *         description: Problem with request
 */
router.get('/:id', dosages.get_one);


/** @swagger
 * /dosages/{id}:
 *   delete:
 *     tags: [dosages]
 *     summary: Delete a single dosage
 *     description: delete one dosage by its ID
 *     operationId: deletedosage
 *     parameters:
 *       - name: id
 *         in: path
 *         description: dosage id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dosage_id:
 *                   type: integer
 *                   format: int64
 *       '400':
 *         description: Problem with request
 *       '511':
 *         description: Need authentication
 *     security:
 *       - api_key: []
 */
router.delete('/:id', dosages.delete_one);


/** @swagger
 * /dosages/{id}:
 *   put:
 *     tags: [dosages]
 *     summary: Update a single dosage
 *     description: update one dosage by its ID
 *     operationId: updatedosage
 *     parameters:
 *       - name: id
 *         in: path
 *         description: dosage id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       $ref: '#components/requestBodies/dosage'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dosage_id:
 *                   type: integer
 *                   format: int64
 *       '400':
 *         description: Problem with request
 *       '511':
 *         description: Need authentication
 *     security:
 *       - api_key: []
 */
router.put('/:id', dosages.update_one);


export default router ;
