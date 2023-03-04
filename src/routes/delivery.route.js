import express from 'express';
const router = express.Router();
import * as delivery from 'controllers/delivery.controller.js';

/** @swagger
 * tags:
 *   name: delivery
 *   description: All about delivery
 */

/** @swagger
 * components:
 *   schemas:
 *     delivery:
 *       type: object
 *       properties:
 *         dosage_id:
 *           type: integer
 *           format: int64
 *           example: 10
 *         method_id:
 *           type: integer
 *           format: int64
 *           example: 10
 */

/** @swagger
 * components:
 *   requestBodies:
 *     delivery:
 *       description: delivery object that will be added to database
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/delivery'
 *       required: true
 */    


/** @swagger
 * /delivery:
 *   get:
 *     tags: [delivery]
 *     summary: Get some delivery objects
 *     description: Provide no dosage_id or method_id to get every relationship. Filter by providing one or the other or both.
 *     operationId: getdelivery
 *     parameters:
 *       - name: dosage_id
 *         in: query
 *         description: dosage_id to filter by
 *         schema:
 *           type: integer
 *           format: int64
 *       - name: method_id
 *         in: query
 *         description: method_id to filter by
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
 *                 $ref: '#/components/schemas/delivery'          
 *       '400':
 *         description: Problem with request
 */
router.get('/', delivery.get_some);


/** @swagger
 * /delivery:
 *   post:
 *     tags: [delivery]
 *     summary: Add an delivery
 *     description: Add an delivery to the database to be used in dosages
 *     operationId: postdelivery
 *     requestBody:
 *       $ref: '#components/requestBodies/delivery'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 delivery_id:
 *                   type: integer
 *                   format: int64
 *       '400':
 *         description: Problem with request
 *       '511':
 *         description: Need authentication
 *     security:
 *       - api_key: []
 */
router.post('/', delivery.add_one);


/** @swagger
 * /delivery:
 *   delete:
 *     tags: [delivery]
 *     summary: Delete a single delivery
 *     description: delete one delivery by its ID
 *     operationId: deletedelivery
 *     parameters:
 *       - name: dosage_id
 *         in: query
 *         description: dosage_id to filter
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *       - name: method_id
 *         in: query
 *         description: method_id to filter
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
 *                 delivery_id:
 *                   type: integer
 *                   format: int64
 *       '400':
 *         description: Problem with request
 *       '511':
 *         description: Need authentication
 *     security:
 *       - api_key: []
 */
router.delete('/', delivery.delete_one);


/** @swagger
 * /delivery:
 *   put:
 *     tags: [delivery]
 *     summary: Update a single delivery
 *     description: update one delivery by its ID
 *     operationId: updatedelivery
 *     parameters:
 *       - name: dosage_id
 *         in: query
 *         description: dosage_id to filter
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *       - name: method_id
 *         in: query
 *         description: method_id to filter
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       $ref: '#components/requestBodies/delivery'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 delivery_id:
 *                   type: integer
 *                   format: int64
 *       '400':
 *         description: Problem with request
 *       '511':
 *         description: Need authentication
 *     security:
 *       - api_key: []
 */
router.put('/', delivery.update_one);


export default router ;
