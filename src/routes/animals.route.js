import express from 'express';
const router = express.Router();
import * as animals from 'controllers/animals.controller.js';

/** @swagger
 * tags:
 *   name: animals
 *   description: All about animals
 */

/** @swagger
 * components:
 *   schemas:
 *     animal:
 *       type: object
 *       required: [name, temperature_low, temperature_high, heart_rate_low, heart_rate_high, respiratory_rate_low, respiratory_rate_high]
 *       properties:
 *         animal_id:
 *           type: integer
 *           format: int64
 *           example: 10
 *         name:
 *           type: string
 *           example: Slug
 *         temperature_low:
 *           type: number
 *           format: float
 *           example: 100.0
 *         temperature_high:
 *           type: number
 *           format: float
 *           example: 102.5
 *         heart_rate_low:
 *           type: number
 *           format: float
 *           example: 60
 *         heart_rate_high:
 *           type: number
 *           format: float
 *           example: 120
 *         respiratory_rate_low:
 *           type: number
 *           format: float
 *           example: 18
 *         respiratory_rate_high:
 *           type: number
 *           format: float
 *           example: 24
 */

/** @swagger
 * components: 
 *   requestBodies:
 *     animal:
 *       description: animal object that will be added to database
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/animal'
 *       required: true
 */    



/** @swagger
 * /animals:
 *   get:
 *     tags: [animals]
 *     summary: Get all existing animals
 *     description: Get a list of all the animals in the database
 *     operationId: getanimals
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/animal'          
 *       '400':
 *         description: Problem with request
 */
router.get('/', animals.get_all);

/** @swagger
 * /animals:
 *   post:
 *     tags: [animals]
 *     summary: Add an animal
 *     description: Add an animal to the database to be used in dosages
 *     operationId: postanimal
 *     requestBody:
 *       $ref: '#components/requestBodies/animal'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 animal_id:
 *                   type: integer
 *                   format: int64
 *       '400':
 *         description: Problem with request
 *       '511':
 *         description: Need authentication
 *     security:
 *       - api_key: []
 */
router.post('/', animals.add_one);


/** @swagger
 * /animals/{id}:
 *   get:
 *     tags: [animals]
 *     summary: Get a single animal
 *     description: get one animal by its ID
 *     operationId: getanimal
 *     parameters:
 *       - name: id
 *         in: path
 *         description: animal id
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
 *               $ref: '#/components/schemas/animal'
 *       '400':
 *         description: Problem with request
 */
router.get('/:id', animals.get_one);

/** @swagger
 * /animals/{id}:
 *   delete:
 *     tags: [animals]
 *     summary: Delete a single animal
 *     description: delete one animal by its ID
 *     operationId: deleteanimal
 *     parameters:
 *       - name: id
 *         in: path
 *         description: animal id
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
 *                 animal_id:
 *                   type: integer
 *                   format: int64
 *       '400':
 *         description: Problem with request
 *       '511':
 *         description: Need authentication
 *     security:
 *       - api_key: []
 */
router.delete('/:id', animals.delete_one);


/** @swagger
 * /animals/{id}:
 *   put:
 *     tags: [animals]
 *     summary: Update a single animal
 *     description: update one animal by its ID
 *     operationId: updateanimal
 *     parameters:
 *       - name: id
 *         in: path
 *         description: animal id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       $ref: '#components/requestBodies/animal'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 animal_id:
 *                   type: integer
 *                   format: int64
 *       '400':
 *         description: Problem with request
 *       '511':
 *         description: Need authentication
 *     security:
 *       - api_key: []
 */
router.put('/:id', animals.update_one);

export default router;
