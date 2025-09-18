import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
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