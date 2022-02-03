const express = require("express");
const router = express.Router();
const astronautController = require("../controllers/astronaut");

router.post('/astronaut',astronautController.addAstronaut);
router.get('/astronaut',astronautController.getAllAstronauts);
router.get('/astronaut/:id',astronautController.getOneAstronaut);
router.put('/astronaut/:id',astronautController.updateAstronaut);
router.delete('/astronaut/:id',astronautController.deleteAstronaut);

module.exports = router;