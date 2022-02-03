const express = require("express");
const router = express.Router();
const spacecraftController = require("../controllers/spacecraft");

router.post('/spacecraft/',spacecraftController.addSpacecraft);
router.get('/spacecraft',spacecraftController.getAllSpacecrafts);
router.get('/spacecraft/:id',spacecraftController.getOneSpacecraft);
router.put('/spacecraft/:id',spacecraftController.updateSpacecraft);
router.delete('/spacecraft/:id',spacecraftController.deleteSpacecraft);

module.exports = router;