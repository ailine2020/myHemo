const router = new require("express").Router();
const bcrypt = require("bcrypt"); // librairie pour encrypter les mdp
const userModel = require("./../models/User");
const auth = require("./../auth"); // librairie pour gerer les token d'authentification
const uploader = require ("./../config/cloudinary");

// Deconnexion
router.get("/signout", (req, res) => {
    const x = req.session.destroy();
    res.json(x);
});

// récup user par le token
router.get("/get-user-by-token", (req, res) => {
    try {
        const user = auth.decodeToken(req.header("x-authenticate")); // x = notre custom -- authenticate = car utilisé pour l'authentification
        const userId = user.infos._id;
        console.log("surement l'user", user);
        res.redirect("/users/" + userId);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

//Connexion
router.post("/signin", async (req, res, next) => {
    const userInfos = req.body;
    //verif que mail et mdp sont renseignés
    if (!userInfos.email || !userInfos.password) {
        //si pas renseignés => retourne mess erreur au client
        res.status(401).json({
            msg: "Identifiants incorrects 1",
            level: "error",
        });
    }
    //si mdp + mail renseignés : verif que mail et mdp correspondent en bdd

console.log(userInfos);

    userModel
        .findOne({
            email: userInfos.email
        }) // recupere le mail fourni
        .then((user) => {
            if (!user) {
                //si pas d'user trouvé pour ce mail => return erreur au client
                return res.status(401).json({
                    msg: "Identifiants incorrects  2",
                    level: "error",
                });
            }
            //si user trouvé => compare mdp crypté stocké dans la bdd avec celui envoyé depuis le formulaire
console.log("--->");
            console.log(user);
            const checkPassword = bcrypt.compareSync(userInfos.password, user.password);
            // si mdp incorrect : 
            if (checkPassword === false) {
                return res.status(401).json({
                    msg: "Identifiants incorrects 3",
                    level: "error",
                });
            }
            //si mdp correct:
            const {
                _doc: clone
            } = {
                ...user
            }; // clone de l'user
            delete clone.password; // supprime le mdp du clone
            req.session.currentUser = clone; // j'inscris le clone dans la session pour maintenir un etat de connexion

            const token = auth.createToken(clone, req.ip); //creation du token avec jwt

            return res
                .header("x-authenticate", token) //token dans l'entête de la réponse pour l'authentification
                .status(200)
                .send({
                    user: clone,
                    token,
                    msg: "Connecté!",
                    level: "success"
                });
        })
        .catch(next);
});

// Inscription
router.post("/signup", uploader.single("avatar"), async (req, res, next) => {
    const user = req.body;
    if (req.file) user.avatar = req.file.path;
    if (!user.name || !user.email || !user.password) {
        return res.status(422).json({
            msg: "Merci de remplir tous les champs requis.",
            level: "warning",
        });
    } else {
        try {

            const previousUser = await userModel.findOne({
                email: user.email
            });

            if (previousUser) {
                return res.status(422).json({
                    msg: "Désolé, cet email n'est pas disponible.",
                    level: "warning",
                });
            }
            const salt = bcrypt.genSaltSync(10); // conversion du mot de passe en chaîne cryptée
            const hashed = bcrypt.hashSync(user.password, salt);
            user.password = hashed; // remplace mdp en version cryptée

            //INSERE/CREATE NEW USER DANS BDD

            await userModel.create(user);
            return res.status(200).json({
                msg: "Profil créé!",
                level: "success"
            });
        } catch (err) {
            next(err);
        }
    }
});

module.exports = router;