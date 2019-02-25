const express = require("express");

const router = express.Router();

/**
 * @swagger
 *
 * paths:
 *   "/legacy/":
 *     get:
 *       description: Returns json
 *       tags: [System]
 *       produces:
 *       - application/json
 *       responses:
 *         '200':
 *           description: Returns json
 */
router.get("/", async (req, res, next) => {
  try {
    return res.json({ yolo: 1, path: req.path });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
