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
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png"
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    card: {
        recto: String,
        verso: String
    }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;