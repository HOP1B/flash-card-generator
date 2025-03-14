import { getQuizPrompt, quizModel } from "../models";

export async function generateQuizzes(transcript: string): Promise<string[]> {
  const chunkSize = 1000;
  const sentences = transcript.split(". ");
  const chunks: string[] = [];
  let currentChunk = "";

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
  for (const chunk of chunks) {
    const response = await quizModel.sendMessage(getQuizPrompt(chunk));
    quizzes.push(response.response.text());
  }

  return quizzes;
}
