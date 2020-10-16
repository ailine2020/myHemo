const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        min: 6,
        required: true,
        type: String,
    },
    avatar: {
        type: String,
        default: "https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png"
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    card: {
        recto: {
            type: String,
            default: "https://illico-travel.ch/wp-content/themes/illico/img/unknown.png"
        },
        verso: {
            type: String,
            default: "https://illico-travel.ch/wp-content/themes/illico/img/unknown.png"
        },
    }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;