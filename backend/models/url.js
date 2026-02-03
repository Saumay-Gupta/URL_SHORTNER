import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    userID: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "user2",
        required: true,
    },
    shortID:{
        type: String,
        required: true,
        unique: true,
    },
    redirectURL:{
        type: String,
        required: true,
    },
    visitedHistory: [{timestamp: {type: Number}}]
},{
    timestamps: true
});

const Url = mongoose.model("url", urlSchema);

export default Url;
