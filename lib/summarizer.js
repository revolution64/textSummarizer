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
            { role: "user", content: `Summarize the following text in exactly ${numberOfSentences} sentences and in ${targetLanguage}, the result should be half of the original text: \n Text: """ ${textToSummarize} """` }],
        model: "gpt-3.5-turbo-0301"
    });

    return chatCompletion?.choices[0]?.message?.content;
}

