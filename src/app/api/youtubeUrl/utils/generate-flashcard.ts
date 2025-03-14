import { getFlashcardPrompt, flashcardModel } from "../models";

export async function generateFlashcards(transcript: string): Promise<string[]> {
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

  const flashcards: string[] = [];
  for (const chunk of chunks) {
    const response = await flashcardModel.sendMessage(getFlashcardPrompt(chunk));
    flashcards.push(response.response.text());
  }

  return flashcards;
}
