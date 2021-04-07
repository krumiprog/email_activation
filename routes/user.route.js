const router = require('express').Router();
const { activate, login, register } = require('../controllers/user.controller');

router.post('/register', register);
router.post('/activate', activate);
router.post('/login', login);

module.exports = router;
