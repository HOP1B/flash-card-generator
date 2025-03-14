import { GoogleGenerativeAI } from "@google/generative-ai";
import { transcript } from "./shared";

export const getQuizPrompt = (transcript: string) => {
  const prompt = `
      Analyze the following YouTube transcript and provide a quizzes with a quiz format: 1 correct answer and 3 incorrect answers. 1st answer must be correct one last 3 must be incorrect.

      Transcript:
      ${transcript}

      Format template:
        Question 1: [Question]
        Answer 1: ...
        Answer 2: ...
        Answer 3: ...
        Answer 4: ...
    `;
  return prompt;
};

const response =
  "**Question 1:** What is pogonotrophy?\n" +
  "\n" +
  "*Answer 1*: The scientific term for growing a beard.\n" +
  "*Answer 2*: The study of ancient Greek pottery. \n" +
  "*Answer 3*: The fear of beards. \n" +
  "*Answer 4*: A type of rare bird found in the Amazon. \n" +
  "\n" +
  "\n" +
  "**Question 2:** How fast does an average beard grow per month?\n" +
  "\n" +
  "*Answer 1*: Half an inch.\n" +
  "*Answer 2*: One inch. \n" +
  "*Answer 3*: A quarter of an inch. \n" +
  "*Answer 4*: Two inches. \n" +
  "\n" +
  "\n" +
  "**Question 3:** What is the length of the longest beard ever recorded?\n" +
  "\n" +
  "*Answer 1*: 18 feet.\n" +
  "*Answer 2*: 12 feet. \n" +
  "*Answer 3*: 6 feet. \n" +
  "*Answer 4*: 24 feet. \n" +
  "\n" +
  "\n" +
  "**Question 4:** According to the transcript, what percentage of people on the Forbes list are typically clean-shaven?\n" +
  "\n" +
  "*Answer 1*: 98%.\n" +
  "*Answer 2*: 50%. \n" +
  "*Answer 3*: 75%. \n" +
  "*Answer 4*: 2%. \n" +
  "\n" +
  "\n" +
  "**Question 5:**  What benefit does a beard supposedly provide regarding staring contests?\n" +
  "\n" +
  "*Answer 1*: Increases your chance of winning by 63%.\n" +
  "*Answer 2*: Decreases your chance of winning by 20%. \n" +
  "*Answer 3*: Has no effect on staring contest outcomes. \n" +
  "*Answer 4*: Increases your chance of winning by 90%. \n" +
  "\n" +
  "\n" +
  "**Question 6:** What is the most attractive beard length for women, according to the transcript?\n" +
  "\n" +
  "*Answer 1*: A 10-day stubble.\n" +
  "*Answer 2*: A full, long beard. \n" +
  "*Answer 3*: A neatly trimmed short beard. \n" +
  "*Answer 4*: A completely shaved face. \n" +
  "\n" +
  "\n" +
  "**Question 7:** Where was the beer made from beard yeast brewed?\n" +
  "\n" +
  "*Answer 1*: Oregon.\n" +
  "*Answer 2*: California. \n" +
  "*Answer 3*: Germany. \n" +
  "*Answer 4*: England. \n" +
  "\n" +
  "**Question 8:**  Compared to what other animal's fur does the transcript say a beard has more microbes?\n" +
  "\n" +
  "*Answer 1*: Dog fur.\n" +
  "*Answer 2*: Cat fur. \n" +
  "*Answer 3*: Horse hair. \n" +
  "*Answer 4*: Rabbit fur. \n";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);
const ai = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const quizModel = ai.startChat({
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
          text: getQuizPrompt(transcript),
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
