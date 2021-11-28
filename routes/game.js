/** 
 * @swagger
 *   components:
 *     schemas:
 *       Game:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *             format: guid
 *             description: The auto-generated id of the game.
 *           players:
 *             type: array
 *             items: 
 *               type: object
 *           numberOfWizards:
 *             type: integer
 *             description: The number of wizards in the game
 *           numberOfJesters:
 *             type: integer
 *             description: The number of jesters in the game
 *           setOfRoundsToPlay:
 *             type: array
 *             items:
 *               type: integer
 *             description: List of rounds to play
 *           createdAt:
 *             type: string
 *             format: date-time
 *             description: The date of the game creation.
 *         example:
 *           id: 7
 *           author: Andy Hunt / Dave Thomas
 *           finished: true
 *           createdAt: 2021-11-26T19:22:31.657Z
 *       GameState:
 *         type: object
 *         properties:
 *           round: 
 *             type: integer
 *             description: The current round of play
 *           deckSize: 
 *             type: integer
 *             description: Cards remaining in the deck
 *           scoreSheet: 
 *             type: object
 *             description: The score sheet
 *           cardShowingTrump: 
 *             type: object
 *             description: The face up card showing the current trump card
 *           inProgressTrick: 
 *             type: array
 *             items: 
 *               type: object
 *             description: The cards played in the current round
 *           dealerIndex:
 *             type: integer
 *             description: the index of the player who is the dealer this round
 *           leadForInProgressTrickIndex: 
 *             type: integer
 *             description: ?? Not sure what this is
 *           wonTricks: 
 *             type: object
 *             desciption: ?? Not sure what this is
 *           trickBids:
 *             type: array
 *             items:
 *               type: integer
 *           hand:
 *             type: array
 *             items:
 *               type: object
 */

/**
 * 
 * @swagger
 * tags:
 *   name: Game
 *   description: API to manage your games.
 * 
 */

/**
 * 
   * @swagger
   * /game/:
   *   get:
   *     summary: Lists all the games
   *     tags: [Game]
   *     responses:
   *       "200":
   *         description: The list of games.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Game'
   *   post:
   *     summary: Creates a new game
   *     tags: [Game]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/Game"
   *     responses:
   *       "201":
   *         description: The created game.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Game"
   * 
   * /game/{id}:
   *   get:
   *     summary: Gets a game by id
   *     tags: [Game]
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
   * /game/{id}/state:
   *   get:
   *     summary: Gets the current state of the game
   *     tags: [Game]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema: 
   *           type: string
   *           format: uuid
   *         required: true
   *         description: The game id
   *       - in: query
   *         name: playerid
   *         type: string
   *         description: the id of the specific player
   *     responses:
   *       "200":
   *         description: The current game state. If playerid is specified then return the game state visible to that user.  If playerid is not specified then return the game state available to any observer
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/GameState'
   *       "404":
   *         description: Game not found.
 */
 
 
const express = require("express");
const router = express.Router();

const games = require("../util/data");

router.get("/", function (req, res) {
    res.status(200).json(games);
});

router.get("/:id", function (req, res) {
    let game = gamess.find(function (item) {
        return item.id == req.params.id;
    });

    book ? res.status(200).json(book) : res.sendStatus(404);
});

router.post("/", function (req, res) {
    const { title, author, finished } = req.body;

    let game = {
        id: games.length + 1,
        title: title,
        author: author,
        finished: finished !== undefined ? finished : false,
        createdAt: new Date(),
    };

    games.push(game);

    res.status(201).json(game);
});


module.exports = router;
