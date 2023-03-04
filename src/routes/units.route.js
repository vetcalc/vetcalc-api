import express from 'express';
const router = express.Router();
import * as units from 'controllers/units.controller.js';


/** @swagger
 * tags:
 *   name: units
 *   description: All about units
 */

/** @swagger
 * components:
 *   schemas:
 *     unit:
 *       type: object
 *       required: [name]
 *       properties:
 *         unit_id:
 *           type: integer
 *           format: int64
 *           example: 10
 *         name:
 *           type: string
 *           example: Niquil
 */

/** @swagger
 * components:
 *   requestBodies:
 *     unit:
 *       description: unit object that will be added to database
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/unit'
 *       required: true
 */    


/** @swagger
 * /units:
 *   get:
 *     tags: [units]
 *     summary: Get all existing units
 *     description: Get a list of all the units in the database
 *     operationId: getunits
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/unit'          
 *       '400':
 *         description: Problem with request
 */
router.get('/', units.get_all);


/** @swagger
 * /units:
 *   post:
 *     tags: [units]
 *     summary: Add an unit
 *     description: Add an unit to the database to be used in dosages
 *     operationId: postunit
 *     requestBody:
 *       $ref: '#components/requestBodies/unit'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 unit_id:
 *                   type: integer
 *                   format: int64
 *       '400':
 *         description: Problem with request
 *       '511':
 *         description: Need authentication
 *     security:
 *       - api_key: []
 */
router.post('/', units.add_one);


/** @swagger
 * /units/{id}:
 *   get:
 *     tags: [units]
 *     summary: Get a single unit
 *     description: get one unit by its ID
 *     operationId: getunit
 *     parameters:
 *       - name: id
 *         in: path
 *         description: unit id
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
 *               $ref: '#/components/schemas/unit'
 *       '400':
 *         description: Problem with request
 */
router.get('/:id', units.get_one);


/** @swagger
 * /units/{id}:
 *   delete:
 *     tags: [units]
 *     summary: Delete a single unit
 *     description: delete one unit by its ID
 *     operationId: deleteunit
 *     parameters:
 *       - name: id
 *         in: path
 *         description: unit id
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
 *                 unit_id:
 *                   type: integer
 *                   format: int64
 *       '400':
 *         description: Problem with request
 *       '511':
 *         description: Need authentication
 *     security:
 *       - api_key: []
 */
router.delete('/:id', units.delete_one);


/** @swagger
 * /units/{id}:
 *   put:
 *     tags: [units]
 *     summary: Update a single unit
 *     description: update one unit by its ID
 *     operationId: updateunit
 *     parameters:
 *       - name: id
 *         in: path
 *         description: unit id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       $ref: '#components/requestBodies/unit'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 unit_id:
 *                   type: integer
 *                   format: int64
 *       '400':
 *         description: Problem with request
 *       '511':
 *         description: Need authentication
 *     security:
 *       - api_key: []
 */
router.put('/:id', units.update_one);


export default router ;
