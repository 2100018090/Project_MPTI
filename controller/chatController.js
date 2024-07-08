const Chat = require("../models/chat");

// create chat
// getallchat
// findchat 

const createChat = async (req, res) => {
    const { firstId, secondId } = req.body;

    // Logging untuk memastikan bahwa data diterima dengan benar
    console.log('Request Body:', req.body);

    // Validasi input
    if (!firstId || !secondId) {
        return res.status(400).json({ message: 'firstId and secondId are required' });
    }

    try {
        const existingChat = await Chat.findOne({
            members: { $all: [firstId, secondId] },
        });

        if (existingChat) return res.status(200).json(existingChat);

        const newChat = new Chat({
            members: [firstId, secondId],
        });

        const response = await newChat.save();

        res.status(200).json(response);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const findUserChats = async (req, res) => {
    const userId = req.params.userId;

    try {
        const chats = await Chat.find({
            members: { $in: [userId] },
        });
        res.status(200).json(chats);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


const findChat = async (req, res) => {
    const { firstId, secondId } = req.params;

    try {
        const chat = await Chat.findOne({
            members: { $all: [firstId, secondId] },
        });
        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = {createChat, findUserChats, findChat};