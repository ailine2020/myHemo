const express = require("express");
const router = new express.Router();
const UserModel = require("./../models/User");
const uploader = require("./../config/cloudinary");

router.get("/user/:id", async (req, res, next) => {
    try {
        const getCard = await UserModel.find({
            author: req.params.id
        })
        res.json(getCard);
    } catch (err) {
        next(err);
    }
});

router.patch("/user/:id", uploader.array("card"), async (req, res, next) => {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {
        "card.recto": req.files[0].path,
        "card.verso": req.files[1].path,
    }, {
        new: true
    });
    console.log(updatedUser)
    res.json(updatedUser)
})

module.exports = router;