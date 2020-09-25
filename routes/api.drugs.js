const router = new require("express").Router();
const DrugModel = require("./../models/Drug");

router.get("/", async (req, res, next) => {
    try {
        const drugs = await DrugModel.find();
        res.json(drugs);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
      const drug = await DrugModel.findById(req.params.id).populate("author");
      res.json(drug);
    } catch (err) {
      next(err);
    }
  });
  router.get("/user/:id", async (req, res, next) => {
    try {
      const drug = await DrugModel.find({author: req.params.id}).populate("author");
      res.json(drug);
      console.log("----------",drug.author);
    } catch (err) {
      next(err);
    }
  });
  router.post("/", async (req, res, next) => {
    const {
        author,
        name,
        date,
        quantite,
    } = req.body;
    try {
        const drug = await DrugModel.create({
            author,
            name,
            date : Date.now(),
            quantite,
        });
        res.json(drug)
    } catch (err) {
        next(err)
    }
});
//DELETE RAPL
router.delete("/:id", async (req, res, next) => {
    try {
        const deleteDrug = await DrugModel.findOneAndDelete(req.params.id);
        res.json(deleteDrug)
    } catch (err) {
        next(err);
    }
});

//PATCH maj rappel

router.patch("/:id", async (req, res, next) => {
    try {
        const updateDrug = await DrugModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }); //pour récuperer le doc mis à jour
        res.json(updateDrug);
    } catch (err) {
        next(err)
    }
});

module.exports = router;