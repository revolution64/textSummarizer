import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env[`API_KEY`]
});

export const getSummary = async (textToSummarize, numberOfSentences, targetLanguage) => {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: `Summarize the following text in ${numberOfSentences} sentences and in ${targetLanguage}, the original text should not be recognizable anymore in the result: ${textToSummarize}` }],
        model: "gpt-3.5-turbo",
    });

    return chatCompletion?.choices[0]?.message?.content;
}

