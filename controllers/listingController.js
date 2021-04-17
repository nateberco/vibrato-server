let express = require('express');
let router = express.Router();
// const cloudinary = require('cloudinary');

let validateSession = require("../middleware/validateSession");
let validateAdmin = require("../middleware/validateAdmin");
const Listing = require("../db").import("../models/listing");


/*********************
 * LISTING - PUBLISH *
 * ********************/

router.post("/publish", validateSession, (req, res) => {
    const listingForm = {
        title: req.body.title,
        description: req.body.description,
        photoURL: req.body.photoURL,
        category: req.body.category,
        keywords: req.body.keywords,
        userId: req.user.id
    };

    Listing.create(listingForm)
        .then((listing) => res.status(200).json(listing))
        .catch((err) => res.status(500).json({ error: err }));
});


/*********************
 * LISTING - EDIT *
 ********************/
 router.put("/edit/:id",  validateSession, function (req, res) {
    res.send('howdy there we made it')
    const updateListingForm = {
        title: req.body.title,
        description: req.body.description,
        photoURL: req.body.photoURL,
        category: req.body.category,
        keywords: req.body.keywords,
        userId: req.user.id
    };
    const query = { where: {  id: req.params.id,  }, 
    include: "user",
      };
  
    Listing.update(updateListingForm, query)
      .then((listings) => res.status(200).json(listings))
      .catch((err) => res.status(500).json({ error: err }));
  });

/*********************
 * PRODUCT - GET ALL
 ********************/
 router.get("/", (req, res) => {
  Listing.findAll()
    .then((listings) => res.status(200).json(listings))
    .catch((err) => res.status(500).json({ error: err }));
});


/******************************
* LISTING - GET ALL for a PUBLISHER *
********************************/

  router.get("/viewShop/:id", function (req, res) {
    const query = {
        where: { userId: req.params.id},
        include: "user",
      };
    Listing.findAll(query)
      .then((listing) => res.status(200).json(listing))
      .catch((err) => res.status(500).json({ error: err }));
  });

/************************
 * PRODUCT - GET BY TITLE
 ***********************/
router.get("/:name", function (req, res) {
  let name = req.params.title;

  Product.findAll({
    where: { title: title },
  })
    .then((listings) => res.status(200).json(listings))
    .catch((err) => res.status(500).json({ error: err }));
});

/*********************
 * LISTING - DELETE (user) **
***********************/

router.delete("/delete/:id", validateSession,  function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id } };
  
    Listing.destroy(query)
      .then(() => res.status(200).json({ message: "Your listing has been removed." }))
      .catch((err) => res.status(500).json({ error: err }));
  });

/*********************
 * LISTING - DELETE (admin) **
***********************/

router.delete("/deleteAdmin/:id", validateSession, validateAdmin,  function (req, res) {
    const query = { where: { id: req.params.id } };
  
    Listing.destroy(query)
      .then(() => res.status(200).json({ message: "Listing has been deleted (Admin)." }))
      .catch((err) => res.status(500).json({ error: err }));
  });


module.exports = router;