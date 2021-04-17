let express = require('express');
let router = express.Router();

let sequelize = require("sequelize");
let validateSession = require("../middleware/validateSession");
const Conversation = require('../db').import('../models/conversation');
const Message = require("../db").import("../models/message");


/*********************
 * Message - Send *
 ********************/
router.post("/send/:id", validateSession, (req, res) => {
  // find all in convo table -- if length > 0 - dont create conversation, if not, create convo
    
  const Op = sequelize.Op 
  const queryConversation = { 
    where: { [Op.or]: [{ senderId: req.user.id }, { recipientId: req.user.id }] }
    };
    Conversation.findOne(queryConversation)
      .then((conversationRow) => {
        // res.json(conversationRow);
        if(conversationRow) {
          const sendMessage = {
            conversationGroupId: conversationRow.id,
            ownerId: req.user.id,
            content: req.body.content,
            conversationId: conversationRow.id
          }
          Message.create(sendMessage)
            .then((messageRow) => {
              const responseObject = {
                conversation: conversationRow,
                content: messageRow,
              }
              res.json(responseObject);
            })
            
        } else {
          Conversation.create({
            recipientId: req.params.id,
            senderId: req.user.id,
          })
          .then(conversationRow => {
            const sendMessage = {
              conversationGroupId: conversationRow.id,
              ownerId: req.user.id,
              content: req.body.content,
              conversationId: conversationRow.id
            }
            Message.create(sendMessage)
              .then((messageRow) => {
                const responseObject = {
                  conversation: conversationRow,
                  content: messageRow,
                }
                res.json(responseObject);
              })
          })
        }
      })
      .catch((err) => res.status(500).json({ error: err }));
});


/*********************
 * Message - Get Conversation List *
 ********************/
 router.get("/viewConversationList", validateSession, (req, res) => {
    
  const Op = sequelize.Op 
  const queryConversation = { 
    where: { [Op.or]: [{ senderId: req.user.id }, { recipientId: req.user.id }] },
    // MUST INCLUDE MESSAGE somehow --> either use "include" or do a separate query for Messages to display that as well!?
    }
  
    Conversation.findAll(
      queryConversation
    )
    .then((conversationRows) => {
      res.json(conversationRows);

    })
 })



module.exports = router;