/** 
 * @swagger
 *   components:
 *     schemas:
 *       WizardSettings:
 *         type: object
 *         properties:    
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
 *             
 *       WizardGameState:
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
 *   name: Wizard
 *   description: API specific to the game of Wizard.
 * 
 */

/**
 * 
   * @swagger
   * /wizard/{id}/state:
   *   get:
   *     summary: Gets the current state of the game
   *     tags: [Wizard]
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
   *               $ref: '#/components/schemas/WizardGameState'
   *       "404":
   *         description: Game not found.
 */
 
 
const express = require("express");
const router = express.Router();

const games = require("../util/data");

router.get("/:id/state", function (req, res) {
    let game = games.find(function (item) {
        return item.id == req.params.id;
    });

    book ? res.status(200).json(game) : res.sendStatus(404);
});


module.exports = router;
