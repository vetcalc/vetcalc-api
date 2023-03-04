import express from 'express';
const router = express.Router();
import * as concentrations from 'controllers/concentrations.controller.js';

/** @swagger
 * tags:
 *   name: concentrations
 *   description: All about concentrations
 */

/** @swagger
 * components:
 *   schemas:
 *     concentration:
 *       type: object
 *       required: [value, unit_id, dosage_id]
 *       properties:
 *         concentration_id:
 *           type: integer
 *           format: int64
 *           example: 10
 *         value:
 *           type: number
 *           format: float
 *           example: 10
 *         unit_id:
 *           type: integer
 *           format: int64
 *         dosage_id:
 *           type: integer
 *           format: int64
 */

/** @swagger
 * components:
 *   requestBodies:
 *     concentration:
 *       description: concentration object that will be added to database
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/concentration'
 *       required: true
 */    


/** @swagger
 * /concentrations:
 *   get:
 *     tags: [concentrations]
 *     summary: Filter for some concentrations
 *     description: Get all concentrations by default, include a dosage id to filter concentrations by that 
 *     operationId: getconcentrations
 *     parameters:
 *       - name: dosage_id
 *         in: query
 *         description: dosage_id to filter by
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
 *                 $ref: '#/components/schemas/concentration'          
 *       '400':
 *         description: Problem with request
 */
router.get('/', concentrations.get_some);


/** @swagger
 * /concentrations:
 *   post:
 *     tags: [concentrations]
 *     summary: Add an concentration
 *     description: Add an concentration to the database to be used in dosages
 *     operationId: postconcentration
 *     requestBody:
 *       $ref: '#components/requestBodies/concentration'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 concentration_id:
 *                   type: integer
 *                   format: int64
 *       '400':
 *         description: Problem with request
 *       '511':
 *         description: Need authentication
 *     security:
 *       - api_key: []
 */
router.post('/', concentrations.add_one);


/** @swagger
 * /concentrations/{id}:
 *   get:
 *     tags: [concentrations]
 *     summary: Get a single concentration
 *     description: get one concentration by its ID
 *     operationId: getconcentration
 *     parameters:
 *       - name: id
 *         in: path
 *         description: concentration id
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
 *               $ref: '#/components/schemas/concentration'
 *       '400':
 *         description: Problem with request
 */
router.get('/:id', concentrations.get_one);


/** @swagger
 * /concentrations/{id}:
 *   delete:
 *     tags: [concentrations]
 *     summary: Delete a single concentration
 *     description: delete one concentration by its ID
 *     operationId: deleteconcentration
 *     parameters:
 *       - name: id
 *         in: path
 *         description: concentration id
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
 *                 concentration_id:
 *                   type: integer
 *                   format: int64
 *       '400':
 *         description: Problem with request
 *       '511':
 *         description: Need authentication
 *     security:
 *       - api_key: []
 */
router.delete('/:id', concentrations.delete_one);


/** @swagger
 * /concentrations/{id}:
 *   put:
 *     tags: [concentrations]
 *     summary: Update a single concentration
 *     description: update one concentration by its ID
 *     operationId: updateconcentration
 *     parameters:
 *       - name: id
 *         in: path
 *         description: concentration id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       $ref: '#components/requestBodies/concentration'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 concentration_id:
 *                   type: integer
 *                   format: int64
 *       '400':
 *         description: Problem with request
 *       '511':
 *         description: Need authentication
 *     security:
 *       - api_key: []
 */
router.put('/:id', concentrations.update_one);


export default router ;
