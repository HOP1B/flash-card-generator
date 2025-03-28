import { getFlashcardPrompt, flashcardModel } from "../models";

export async function generateFlashcards(transcript: string): Promise<string> {
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
    try {
      const response = await flashcardModel.sendMessage(
        getFlashcardPrompt(chunk)
      );
      const flashcardText = await response.response.text();
      console.log(
        `Flashcard text for chunk ${chunks.indexOf(chunk) + 1}:`,
        flashcardText
      );
      if (flashcardText) {
        flashcards.push(flashcardText);
      }
    } catch (error) {
      console.error(
        `Error generating flashcards for chunk ${chunks.indexOf(chunk) + 1}:`,
        error
      );
    }
  }

  const combinedFlashcards = flashcards
    .join("")
    .split("\n")
    .filter((line) => line.trim() !== "\n")
    .filter((line) => line.trim() !== "")
    .join("\n");
  console.log("Combined flashcards:", combinedFlashcards);
  return combinedFlashcards || "";
}
