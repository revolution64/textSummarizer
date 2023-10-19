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
            { role: "user", content: `Summarize the following text with exactly ${numberOfSentences} words. The summary should be in ${targetLanguage}. If the text is too short, you can generate sentences based on the context. \n Text: """ ${textToSummarize} """` }],
        model: "gpt-3.5-turbo-16k",
        n: 3
    });

    const longestText = chatCompletion?.choices.sort(choice => choice.message.content.length)[0];

    return longestText.message.content;
}

