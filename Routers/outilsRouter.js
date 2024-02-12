const express = require("express");
const router = express.Router();
const outils = require("../Controllers/outilsController");
// const Middleware = require("../middleware/test");

router.get("/outils" , outils.getManyOutils);
router.get("/outils/:id" , outils.getByIdOutils) ; 
router.get("/outils/getdata/:email" , outils.getBymailOutils) ; 
router.post("/outils" , outils.postOutils) ; 
router.put("/outils" , outils.putManyOutils) ; 
router.put("/outils/:id" , outils.putOutilsById) ; 
router.delete("/outils" , outils.deleteManyOutils) ; 
router.delete("/outils/:id" , outils.deleteByIdOutils);

module.exports = router ;