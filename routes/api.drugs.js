const router = new require("express").Router();
const RappelModel = require("../models/Rappel");
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
        const drug = await (await DrugModel.findById(req.params.id).populate("author"));
        res.json(drug);
    } catch (err) {
        next(err);
    }
});
router.get("/user/:id", async (req, res, next) => {
    try {
        const drug = await DrugModel.find({
            author: req.params.id
        }).populate("author");
        res.json(drug);
        console.log("----------++++++++123", drug);
    } catch (err) {
        next(err);
    }
});
router.post("/user/:id", async (req, res, next) => {
    const {
        name,
        date,
        quantite,
    } = req.body;
    try {
        const drug = await DrugModel.create({
            author : req.params.id,
            name,
            date,
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

router.patch("/:id/decrement-stock", async (req, res, next) => {
    // find rappel
    // ensuite find toutes les drugs du rappel
    // et enfin update avec la formule ci dessus, CHAQUE drug.quantite
    // const rappel = RappelModel.find({
    //     drug: req.params.id
    // })
    // drugs.forEach(drug => {
    try {
        const decreamentdDrug = await DrugModel.findByIdAndUpdate({
            drug: req.params.id
        }, req.body, {
            $inc: {
                quantite: -1
            }
        }, {
            new: true
        }); //pour récuperer le doc mis à jour
        res.json(decreamentdDrug);
    } catch (err) {
        next(err)
    }
});

// });

module.exports = router;