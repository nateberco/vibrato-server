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
    // [Op.or]: [{ senderId: req.user.id }, { recipientId: req.user.id }]
    where: { [Op.or]: [
            {[Op.and] : [
            { senderId: req.user.id },
            { recipientId: req.params.id }
            ]},
            {[Op.and] : [
            { recipientId: req.user.id },
            { senderId: req.params.id }
      ]}
    ]}
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
    where: {
      [Op.or]: [{ senderId: req.user.id }, { recipientId: req.user.id }]
    }
    // MUST INCLUDE MESSAGE somehow --> either use "include" or do a separate query for Messages to display that as well!?
    }
  
    Conversation.findAll(
      queryConversation
    )
    .then((conversationRows) => {
      // res.json(conversationRows);
      if(conversationRows.length > 0) {
        let conversationGroupId = [];
        let userArray = [];
        let replyTo = ""
        let newConversationArray = [];
        
        let userIdArray = [{ id: req.user.id }];
        conversationRows.forEach((conversationRow, index) => {
        
          
          if(conversationRow.senderId == req.user.id) {
            userIdArray.push({ id: conversationRow.recipientId })
            replyTo = conversationRow.recipientId
          } else {
            userIdArray.push( { id: conversationRow.senderId })
            replyTo = conversationRow.senderId
          } 
          newConversationArray.push(replyTo)
          conversationGroupId.push( { id: conversationRow.id} )
        })
        let queryUser = {
          where: { [Op.or]: userIdArray }
        } 
        User.findAll(queryUser)
        .then(users => {
          // res.json({user: users, conversation: conversationRows})
          userArray = users;
        }) 
        console.log(conversationGroupId)
        let queryMessages = {
          where: { [Op.or]: conversationGroupId }
        } 
        Message.findAll(queryMessages)
        .then(messages => {
          res.json( {user: userArray, conversation: conversationRows, messages: messages, replyTo: newConversationArray } )
        }) 
      } else {
        res.json({ users: [], conversation: [], message: 'No Conversations Found!' })
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
 })

 /*********************
 * Message - Get Message List *
 ********************/
  router.get("/viewMessages/:conversationGroupId", validateSession, (req, res) => {
    
    const Op = sequelize.Op 
    const queryConversationGroupId = { 
      where: { conversationGroupId: req.params.conversationGroupId }
        
      }
      Message.findAll(queryConversationGroupId)
      .then(messages => {
        res.json({ messages: messages, userId: req.user.id})
      })
    })

module.exports = router;