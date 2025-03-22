import { GoogleGenerativeAI } from "@google/generative-ai";
import { transcript } from "./shared";

export const getFlashcardPrompt = (transcript: string) => {
  const prompt = `
      Analyze the following YouTube transcript and provide a flashcards with a flashcard format: front: question behind: correct answer.

      Transcript:
      ${transcript}

      Format template:
        Question 1: [Question]
        Answer 1: [Answer]
    `;
  return prompt;
};

const response =
  "***Flashcard***\n" +
  "\n" +
  "\n" +
  "**Question 1:** What is pogonotrophy?\n" +
  "\n" +
  "*Answer 1*: The scientific term for growing a beard.\n" +
  "\n" +
  "\n" +
  "**Question 2:** How fast does an average beard grow per month?\n" +
  "\n" +
  "*Answer 2*: Half an inch.\n" +
  "\n" +
  "\n" +
  "**Question 3:** What is the length of the longest beard ever recorded?\n" +
  "\n" +
  "*Answer 3*: 18 feet.\n" +
  "\n" +
  "\n" +
  "**Question 4:** According to the transcript, what percentage of people on the Forbes list are typically clean-shaven?\n" +
  "\n" +
  "*Answer 4*: 98%.\n" +
  "\n" +
  "\n" +
  "**Question 5:**  What benefit does a beard supposedly provide regarding staring contests?\n" +
  "\n" +
  "*Answer 5*: Increases your chance of winning by 63%.\n" +
  "\n" +
  "\n" +
  "**Question 6:** What is the most attractive beard length for women, according to the transcript?\n" +
  "\n" +
  "*Answer 6*: A 10-day stubble.\n" +
  "\n" +
  "\n" +
  "**Question 7:** Where was the beer made from beard yeast brewed?\n" +
  "\n" +
  "*Answer 7*: Oregon.\n" +
  "\n" +
  "\n" +
  "**Question 8:**  Compared to what other animal's fur does the transcript say a beard has more microbes?\n" +
  "\n" +
  "*Answer 8*: Dog fur.\n";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);
const ai = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const flashcardModel = ai.startChat({
  generationConfig: {
    temperature: 0.85,
    topP: 0.95,
    topK: 40,
    responseMimeType: "text/plain",
  },
  history: [
    {
      role: "user",
      parts: [
        {
          text: getFlashcardPrompt(transcript),
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: response,
        },
      ],
    },
  ],
});
