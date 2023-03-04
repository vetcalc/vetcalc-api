import express from 'express';
const router = express.Router();
import * as drugs from 'controllers/drugs.controller.js';

/** @swagger
 * tags:
 *   name: drugs
 *   description: All about drugs
 */

/** @swagger
 * components:
 *   schemas:
 *     drug:
 *       type: object
 *       required: [name]
 *       properties:
 *         drug_id:
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
 *     drug:
 *       description: drug object that will be added to database
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/drug'
 *       required: true
 */    


/** @swagger
 * /drugs:
 *   get:
 *     tags: [drugs]
 *     summary: Get all existing drugs
 *     description: Get a list of all the drugs in the database
 *     operationId: getdrugs
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/drug'          
 *       '400':
 *         description: Problem with request
 */
router.get('/', drugs.get_all);


/** @swagger
 * /drugs:
 *   post:
 *     tags: [drugs]
 *     summary: Add an drug
 *     description: Add an drug to the database to be used in dosages
 *     operationId: postdrug
 *     requestBody:
 *       $ref: '#components/requestBodies/drug'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 drug_id:
 *                   type: integer
 *                   format: int64
 *       '400':
 *         description: Problem with request
 *       '511':
 *         description: Need authentication
 *     security:
 *       - api_key: []
 */
router.post('/', drugs.add_one);


/** @swagger
 * /drugs/{id}:
 *   get:
 *     tags: [drugs]
 *     summary: Get a single drug
 *     description: get one drug by its ID
 *     operationId: getdrug
 *     parameters:
 *       - name: id
 *         in: path
 *         description: drug id
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
 *               $ref: '#/components/schemas/drug'
 *       '400':
 *         description: Problem with request
 */
router.get('/:id', drugs.get_one);


/** @swagger
 * /drugs/{id}:
 *   delete:
 *     tags: [drugs]
 *     summary: Delete a single drug
 *     description: delete one drug by its ID
 *     operationId: deletedrug
 *     parameters:
 *       - name: id
 *         in: path
 *         description: drug id
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
 *                 drug_id:
 *                   type: integer
 *                   format: int64
 *       '400':
 *         description: Problem with request
 *       '511':
 *         description: Need authentication
 *     security:
 *       - api_key: []
 */
router.delete('/:id', drugs.delete_one);


/** @swagger
 * /drugs/{id}:
 *   put:
 *     tags: [drugs]
 *     summary: Update a single drug
 *     description: update one drug by its ID
 *     operationId: updatedrug
 *     parameters:
 *       - name: id
 *         in: path
 *         description: drug id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       $ref: '#components/requestBodies/drug'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 drug_id:
 *                   type: integer
 *                   format: int64
 *       '400':
 *         description: Problem with request
 *       '511':
 *         description: Need authentication
 *     security:
 *       - api_key: []
 */
router.put('/:id', drugs.update_one);


export default router ;
