const router = new require("express").Router();
const RappelModel = require("./../models/Rappel");

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
      const rappel = await RappelModel.findById(req.params.id);
      res.json(rappel);
    } catch (err) {
      next(err);
    }
  });

//POST : create rappel

router.post("/", async (req, res, next) => {
    const {
        author,
        calendar,
        periodicity,
        injection_,
        drugs,
        date_rappel,
        title,
    } = req.body;
    try {
        const rappel = await RappelModel.create({
            author,
            calendar,
            periodicity,
            injection_,
            drugs,
            date_rappel,
            title,
        });
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