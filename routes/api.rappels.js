const router = new require("express").Router();
const UserModel = require("../models/User");
const RappelModel = require("./../models/Rappel");
const cronJobs = require("../cron/user-rappel");

router.get("/", async (req, res, next) => {
    try {
        const rappels = await RappelModel.find();
        res.json(rappels);
    } catch (err) {
        next(err);
    }
});
router.get("/:id", async (req, res, next) => {
    try {
      const rappel = await (await RappelModel.findById(req.params.id).populate("author").populate("quantite"));
      res.json(rappel);
    } catch (err) {
      next(err);
    }
  });
router.get("/user/:id", async (req, res, next) => {
    try {
      const rappel = await RappelModel.find({author: req.params.id}).populate("author");
      res.json(rappel);
    } catch (err) {
      next(err);
    }
  });

//POST : create rappel

router.post("/", async (req, res, next) => {
    const {
        author,
        date_created,
        periodicity,
        drugs,
        date_last_rappel,
        title,
    } = req.body;
    try {
        const rappel = await RappelModel.create({
            author,
            date_created,
            periodicity,
            drugs,
            date_last_rappel,
            title,
        });
       
        cronJobs.userRappel(rappel);
        res.json(rappel)
    } catch (err) {
        next(err)
    }
});
//DELETE RAPL
router.delete("/:id", async (req, res, next) => {
    try {
        const deleteRappel = await RappelModel.findOneAndDelete(req.params.id);
        res.json(deleteRappel)
    } catch (err) {
        next(err);
    }
});

//PATCH maj rappel

router.patch("/:id", async (req, res, next) => {
    try {
        const updateRappel = await RappelModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }); //pour récuperer le doc mis à jour
        res.json(updateRappel);
    } catch (err) {
        next(err)
    }
});


module.exports = router;