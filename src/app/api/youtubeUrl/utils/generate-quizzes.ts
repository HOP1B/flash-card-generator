import { getQuizPrompt, quizModel } from "../models";

export async function generateQuizzes(transcript: string): Promise<string> {
  const chunkSize = 1000;
  const sentences = transcript.split(". ");
  const chunks: string[] = [];
  let currentChunk = "";

  // Split the transcript into chunks
  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > chunkSize) {
      chunks.push(currentChunk);
      currentChunk = sentence;
    } else {
      currentChunk += (currentChunk ? ". " : "") + sentence;
    }
  }
  if (currentChunk) chunks.push(currentChunk);

  const quizzes: string[] = [];
  let questionCounter = 1;

  // Generate quizzes for each chunk
  for (const chunk of chunks) {
    try {
      const response = await quizModel.sendMessage(getQuizPrompt(chunk));
      const quizText = await response.response.text();
      console.log(
        `Quiz text for chunk ${chunks.indexOf(chunk) + 1}:`,
        quizText
      );

      // Split the quiz text into lines and reformat with continuous numbering
      const lines = quizText.split("\n").filter((line) => line.trim() !== "");
      let reformattedQuiz = "";
      let inQuestion = false;

      for (const line of lines) {
        // Only consider lines that start with a number and a question mark as valid questions
        if (/^\d+\.\s*.*\?$/.test(line)) {
          reformattedQuiz += `${questionCounter}. ${line.replace(
            /^\d+\.\s*/,
            ""
          )}\n`;
          questionCounter++;
          inQuestion = true;
        } else if (inQuestion && line.startsWith("-")) {
          reformattedQuiz += `${line}\n`;
        }
      }

      if (reformattedQuiz) {
        quizzes.push(reformattedQuiz);
      }
    } catch (error) {
      console.error(
        `Error generating quiz for chunk ${chunks.indexOf(chunk) + 1}:`,
        error
      );
    }
  }

  // Combine all quizzes into a single string
  const combinedQuizzes = quizzes.join("\n");
  console.log("Combined quizzes:", combinedQuizzes);

  return combinedQuizzes || "";
}
