import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env[`API_KEY`]
});

export const getSummary = async (textToSummarize, numberOfSentences, targetLanguage) => {
    const chatCompletion = await openai.chat.completions.create({
        temperature: 0.7,
        messages: [
            {
                "role": "system",
                "content": "You are a helpful assistant for text summarization.",
            },
            { role: "user", content: `Summarize the following text with exactly ${numberOfSentences} words. The summary should be in ${targetLanguage}. \n Text: """ ${textToSummarize} """` }],
        model: "gpt-3.5-turbo"
    });

    return chatCompletion?.choices[0]?.message?.content;
}

