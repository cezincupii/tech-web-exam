const express = require('express')
const router = express.Router();
const otherRouter = require('./other')
const astronautRouter = require('./astronaut');
const spacecraftRouter=require('./spacecraft');

if(process.env.NODE_ENV !== 'production') {
    router.use('/', otherRouter);
}
router.use('/', astronautRouter);
router.use('/',spacecraftRouter);

module.exports = router