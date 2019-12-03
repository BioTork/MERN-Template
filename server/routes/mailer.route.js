const mailer = require('../controllers/mailer.controller.js'),
    express = require('express'),
    router = express.Router()

router.route('/')
    .post(mailer.sendInfoMail);

module.exports = router;
