const router = new require("express").Router();
const UserModel = require("./../models/User");
const auth = require("./../auth");
const bcrypt = require("bcrypt");


router.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//POST : create new user
router.post("/", async (req, res, next) => {
  const {
    name,
    email,
    password,
    avatar,
    role,
  } = req.body;
  try {
    const user = await UserModel.create({
      name,
      email,
      password,
      avatar,
      role,
    });
    res.json(user)
  } catch (err) {
    next(err)
  }
});

// DELETE USER
router.delete("/:id", async (req, res, next) => {
  try {
    const deleteUser = await UserModel.findOneAndDelete(req.params.id);
    res.json(deleteUser)
  } catch (err) {
    next(err);
  }
});

//PATCH mettre à jour un user
router.patch("/:id", auth.authenticate, async (req, res, next) => {
  var user = {
    ...req.body
  };
  try {
    const newPassword = await bcrypt.hash(user.password, 10);
    user.password = newPassword;
    const updateUser = await UserModel.findByIdAndUpdate(req.params.id, user, {
      new: true
    }); //pour récuperer le doc mis à jour
    res.json(updateUser);
  } catch (err) {
    next(err)
  }

});

module.exports = router;