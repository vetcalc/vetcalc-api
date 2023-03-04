import express from 'express';
const router = express.Router();
import * as methods from 'controllers/methods.controller.js';


/** @swagger
 * tags:
 *   name: methods
 *   description: All about methods
 */

/** @swagger
 * components:
 *   schemas:
 *     method:
 *       type: object
 *       required: [name]
 *       properties:
 *         method_id:
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
 *     method:
 *       description: method object that will be added to database
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/method'
 *       required: true
 */    


/** @swagger
 * /methods:
 *   get:
 *     tags: [methods]
 *     summary: Get all existing methods
 *     description: Get a list of all the methods in the database
 *     operationId: getmethods
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/method'          
 *       '400':
 *         description: Problem with request
 */
router.get('/', methods.get_all);


/** @swagger
 * /methods:
 *   post:
 *     tags: [methods]
 *     summary: Add an method
 *     description: Add an method to the database to be used in dosages
 *     operationId: postmethod
 *     requestBody:
 *       $ref: '#components/requestBodies/method'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 method_id:
 *                   type: integer
 *                   format: int64
 *       '400':
 *         description: Problem with request
 *       '511':
 *         description: Need authentication
 *     security:
 *       - api_key: []
 */
router.post('/', methods.add_one);


/** @swagger
 * /methods/{id}:
 *   get:
 *     tags: [methods]
 *     summary: Get a single method
 *     description: get one method by its ID
 *     operationId: getmethod
 *     parameters:
 *       - name: id
 *         in: path
 *         description: method id
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
 *               $ref: '#/components/schemas/method'
 *       '400':
 *         description: Problem with request
 */
router.get('/:id', methods.get_one);


/** @swagger
 * /methods/{id}:
 *   delete:
 *     tags: [methods]
 *     summary: Delete a single method
 *     description: delete one method by its ID
 *     operationId: deletemethod
 *     parameters:
 *       - name: id
 *         in: path
 *         description: method id
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
 *                 method_id:
 *                   type: integer
 *                   format: int64
 *       '400':
 *         description: Problem with request
 *       '511':
 *         description: Need authentication
 *     security:
 *       - api_key: []
 */
router.delete('/:id', methods.delete_one);


/** @swagger
 * /methods/{id}:
 *   put:
 *     tags: [methods]
 *     summary: Update a single method
 *     description: update one method by its ID
 *     operationId: updatemethod
 *     parameters:
 *       - name: id
 *         in: path
 *         description: method id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       $ref: '#components/requestBodies/method'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 method_id:
 *                   type: integer
 *                   format: int64
 *       '400':
 *         description: Problem with request
 *       '511':
 *         description: Need authentication
 *     security:
 *       - api_key: []
 */
router.put('/:id', methods.update_one);


export default router ;
