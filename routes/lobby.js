/** 
 *@swagger
 *  components:
 *    securitySchemes:
 *     bearerAuth:            # arbitrary name for the security scheme
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT 
 *    schemas:
 *      Player:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: guid
 *            description: The auto-generated player id.
 *          name:
 *            type: string
 *          game:
 *            type: integer
 *            description: The id of the game the player is playing
 *          createdAt:
 *            type: string
 *            format: date-time
 *            description: The date of the game creation.
 *        example:
 *          id: 7
 *          name: inspirobot
 *          game: 5   
 *          createdAt: 2021-11-26T19:22:31.657Z
 *      Game:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: guid
 *            description: The auto-generated game id.
 *          type:
 *            type: string
 *            description: The type of game
 *          players:
 *            type: array
 *            items: 
 *              $ref: '#/components/schemas/Player'
 *          status:
 *            type: string
 *            enum: [open, closed, started, finished]
 *          settings:
 *             $ref: '#/components/schemas/WizardSettings' 
 *          createdAt:
 *            type: string
 *            format: date-time
 *            description: The date of the game creation.
 *        example:
 *          id: 7
 *          type: Wizard 
 *          players: []
 *          settings: {}
 *          createdAt: 2021-11-26T19:22:31.657Z
*/

/**
 * 
 * @swagger
 * tags:
 *   name: Lobby
 *   description: API to manage your games.
 * 
 */

/**
 * 
   * @swagger
   * /lobby/:
   *   get:
   *     summary: Lists all the games
   *     tags: [Lobby]
   *     responses:
   *       "200":
   *         description: The list of games.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Game'
   *   post:
   *     security:
   *       - bearerAuth: []    
   *     summary: Creates a new game
   *     tags: [Lobby]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:      # Request body contents
   *             type: object
   *             properties:
   *               type:
   *                 type: string
   *               settings:
   *                 type: object 
   *             example:   # Sample object
   *               id: 10
   *               name: Jessica Smith
   *     responses:
   *       "201":
   *         description: The created game.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Game"
   * 
   * /lobby/{id}:
   *   get:
   *     summary: Gets a game by id
   *     tags: [Lobby]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *           format: uuid
   *         required: true
   *         description: The game id
   *     responses:
   *       "200":
   *         description: The game settings.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Game'
   *       "404":
   *         description: Game not found.
   *
   * /lobby/{id}/start:
   *   put:
   *     security:
   *       - bearerAuth: []    
   *     summary: Starts a game
   *     tags: [Lobby]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *           format: uuid
   *         required: true
   *         description: The game id to start
   *     responses:
   *       "204":
   *         description: No content returned. Game started.
   *       "304":
   *         description: Not modified. Game already started.
   *       "404":
   *         description: Game not found.
   * /lobby/{id}/join:
   *   put:
   *     security:
   *       - bearerAuth: []    
   *     summary: Join a game
   *     tags: [Lobby]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *           format: uuid
   *         required: true
   *         description: The game id to join
   *     responses:
   *       "204":
   *         description: No content returned. Game successfully joined.
   *       "304":
   *         description: Not modified. Game already started.
   *       "404":
   *         description: Game not found.

*/


const express = require("express");
const router = express.Router();

let games = {}

router.get("/", function (req, res) {
    res.status(200).json(games);
});

router.post("/", function (req, res) {
    const { title, creator } = req.body;

    let game = {
        id: games.length + 1,
        createdAt: new Date(),
    };

    games.push(game);

    res.status(201).json(game);
});


module.exports = router;
