import express from "express";
import axios from "axios";
var router = express.Router();

router.post('/', async function(req, res, next) {
    const { callbackServer, callbackToken, room, data } = req.body;
    const [level, text] = data?.split(':') || ['OK', 'This is an example system message from chatbot'];

    const headers = {
        'Authorization': `Bearer ${callbackToken}`,
        'Content-Type': 'application/json'
    };

    const systemMessagePayload = {
        room: room.id,
        text: text || 'This is an example system message from chatbot',
        level: level.toUpperCase()
    };

    try {
        const response = await axios.post(`${callbackServer}/api/v1/messages`, systemMessagePayload, { headers });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

export default router;