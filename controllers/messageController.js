let express = require('express');
let router = express.Router();
// const cloudinary = require('cloudinary');

let validateSession = require("../middleware/validateSession");
const Message = require("../db").import("../models/message");


/*********************
 * Message - Send *
 ********************/
router.post("/send/:id", validateSession, (req, res) => {
    const sendMessage = {
        content: req.body.content,
        senderID: req.user.id,
        recipientID: req.params.id
    };

    Message.create(sendMessage)
        .then((message) => res.status(200).json(message))
        .catch((err) => res.status(500).json({ error: err }));
});

/*********************
 * Message - View *
********************/

router.get("/view/:id", validateSession, function (req, res) {
    const query = {
      where: { id: req.params.id }
    };
    Message.findAll(query)
      .then((message) => res.status(200).json(message))
      .catch((err) => res.status(500).json({ error: err }));
  });

  module.exports = router;