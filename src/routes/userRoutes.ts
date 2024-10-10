import { Router } from "express";
import { createUser, getUser, getUsers } from "../controllers/userController";

const userRouter = Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe123
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               profile:
 *                 type: object
 *                 properties:
 *                   bio:
 *                     type: string
 *                     example: "Software developer and tech enthusiast."
 *                   socialLinks:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "https://twitter.com/johndoe" 
 *                     example: [
 *                       "https://twitter.com/johndoe",
 *                       "https://linkedin.com/in/johndoe"
 *                     ]
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request
 */
userRouter.post("/", createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                     example: johndoe123
 *                   email:
 *                     type: string
 *                     example: johndoe@example.com
 *                   profile:
 *                     type: object
 *                     properties:
 *                       bio:
 *                         type: string
 *                         example: "Software developer and tech enthusiast."
 *                       socialLinks:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "https://twitter.com/johndoe"
 *                         example: [
 *                           "https://twitter.com/johndoe",
 *                           "https://linkedin.com/in/johndoe"
 *                         ] 
 */
userRouter.get("/", getUsers);

/**
 * @swagger
 * /api/users/{username}:
 *   get:
 *     summary: Retrieve a user by username
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user
 *         schema:
 *           type: string
 *           example: johndoe123
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: johndoe123
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 profile:
 *                   type: object
 *                   properties:
 *                     bio:
 *                       type: string
 *                       example: "Software developer and tech enthusiast."
 *                     socialLinks:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "https://twitter.com/johndoe" 
 *                       example: [
 *                         "https://twitter.com/johndoe",
 *                         "https://linkedin.com/in/johndoe"
 *                       ] 
 *       404:
 *         description: User not found
 */
userRouter.get("/:username", getUser);

export default userRouter;
