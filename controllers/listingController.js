let express = require('express');
let router = express.Router();
// const cloudinary = require('cloudinary');


let validateSession = require("../middleware/validateSession");
const Listing = require("../db").import("../models/listing");



router.get('/practice', function(req, res) {
    res.send('howdy there we practiceen')
})

/*********************
 * LISTING - PUBLISH *
 ********************/
router.post("/publish", validateSession, (req, res) => {
    const listingForm = {
        title: req.body.title,
        description: req.body.description,
        photoURL: req.body.photoURL,
        category: req.body.category,
        keywords: req.body.keywords,
        userID: req.params.id
    };

    Listing.create(listingForm)
        .then((listing) => res.status(200).json(listing))
        .catch((err) => res.status(500).json({ error: err }));
});


/*********************
 * LISTING - EDIT *
 ********************/
 router.put("/edit/:id",  function (req, res) {
    res.send('howdy there we made it')
    const updateListingForm = {
        title: req.body.title,
        description: req.body.description,
        photoURL: req.body.photoURL,
        category: req.body.category,
        keywords: req.body.keywords,
    };
    const query = { where: { id: req.params.id, userID: req.user.id } };
  
    Listing.update(updateListingForm, query)
      .then((listing) => res.status(200).json(listing))
      .catch((err) => res.status(500).json({ error: err }));
  });



module.exports = router;