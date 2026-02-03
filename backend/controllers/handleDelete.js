import Url from "../models/url.js";

const handleDelete = async (req, res) => {
    try {
        const { shortID } = req.params;
        const userId = req.user.userId;
        
        const deleted = await Url.findOneAndDelete({
            shortID,
            userID: userId,
        });
        
        if (!deleted) {
            return res.status(200).json({ message: "URL not found" });
        }
        
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({message : "Internal Server Error"});
    } 
};

export default handleDelete;