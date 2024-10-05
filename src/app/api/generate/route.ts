import OpenAI from 'openai'
import { NextRequest, NextResponse } from 'next/server';
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})

const questionsExtraction = z.object({
    questions: z.array(z.object({
        question: z.string(),
        choices: z.array(z.string()),
        answer: z.string(),
    })),
});

export async function POST(request: NextRequest) {
    let responseContent = {};
    try {
        const {
            question,
            questions,
            language,
            difficulty } = await request.json();

        const prompt = `You are an expert in generating quiz questions.
        You will be given a topic, number of questions, language and difficulty level.
        Generate ${questions} questions on the topic of ${question} in ${language} language and ${difficulty} difficulty. 1 correct answer and 3 incorrect answers for each question. do not repeat the questions.
        The questions should be in the following JSON format only, validate that output is a valid javascript JSON format to be parsed {} remove unnecessary text, backtick and characters`;

        const completion = await openai.beta.chat.completions.parse({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: prompt }],
            response_format: zodResponseFormat(questionsExtraction, "questionsExtraction"),
        })

        responseContent = completion.choices[0].message?.parsed || {}



        if ('questions' in responseContent) {
            return NextResponse.json({ questions: responseContent?.questions });
        }
        else {
            return NextResponse.json({ error: 'operation failed' }, { status: 500 });
        }

    }
    catch (error) {
        console.error('Error in quiz operation:', error);
        return NextResponse.json({ error: 'operation failed' }, { status: 500 })
    }

}