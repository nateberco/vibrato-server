let express = require('express');
let router = express.Router();


router.get('/practice', function(req, res) {
    res.send('howdy there we practiceen')
})

module.exports = router;