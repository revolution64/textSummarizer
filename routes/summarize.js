import express from "express";
var router = express.Router();

import { getSummary } from '../lib/summarizer.js';

let summarizeCount = 0;
const MAX_SUMMARIZE_COUNT = 30;

setInterval(() => {
    // Reset the counter to 0 every hour
    summarizeCount = 0;
}, 3600000);

/* GET home page. */
router.post('/', async function(req, res, next) {

    if (summarizeCount >= MAX_SUMMARIZE_COUNT) {
        res.status(400);
        res.send('DAILY_SUMMARY_COUNT_SUCCEEDED');
    } else {
        const response = await getSummary(req.body.textToSummarize, req.body.numberOfSentences);
        summarizeCount++;
        res.json(response);
    }

});

export default router;
