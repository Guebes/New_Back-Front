const express = require('express');

const router = express.Router();

const ControlAutentic =
    require('../Controladores/ControlAutentic');

router.post(
    '/login',
    ControlAutentic.login
);

module.exports = router;