const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    birthdate: Date,
    avatar: {
        type: String,
        default: "https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png"
    },
    role: {
        type: String,
        enum: ["admin", "user"]
    },
    type_user: {
        type: String,
        enum: ["parent", "patient"]
    },
    hemophilia_card: {
        recto: {
            type: String,
            default: "https://urbandojo.com/wp-content/uploads/2017/04/default-image.jpg"
        },
        verso: {
            type: String,
            default: "https://urbandojo.com/wp-content/uploads/2017/04/default-image.jpg"
        },
    },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;