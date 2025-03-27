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

  // Generate quizzes for each chunk
  const chunk = chunks[1];
  // for (const chunk of chunks) {
  try {
    const response = await quizModel.sendMessage(getQuizPrompt(chunk));
    const quizText = await response.response.text();

    // Split the quiz text into lines and reformat with continuous numbering
    const lines = quizText
      .split("\n")
      .filter((line) => line.trim() !== "")
      .filter((line) => line.trim() !== "\n");
    quizzes.push(lines.join("\n"));
  } catch (error) {
    console.error(
      `Error generating quiz for chunk ${chunks.indexOf(chunk) + 1}:`,
      error
    );
  }
  // }

  // Combine all quizzes into a single string
  const combinedQuizzes = quizzes.join("\n");

  return combinedQuizzes || "";
}
