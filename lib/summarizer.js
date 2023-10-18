import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "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",
});

export const getSummary = async (textToSummarize, numberOfSentences) => {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: `Summarize the following text in ${numberOfSentences} sentences: ${textToSummarize}` }],
        model: "gpt-3.5-turbo",
    });

    console.log(chatCompletion.choices);
    return chatCompletion?.choices[0]?.message?.content;
}

