const mailer = require('../controllers/mailer.controller.js'),
    express = require('express'),
    router = express.Router()

router.route('/')
    .post(mailer.sendTestMail);

module.exports = router;
