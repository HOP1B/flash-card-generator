export function convertResponseToFlashcard(inputString: string) {
  const flashcards: { question: string; answer: string }[] = [];

  // Split the input string by '**Flashcard' and process each flashcard block
  const flashcardBlocks = inputString.split("**Flashcard").slice(1);

  flashcardBlocks.forEach((block) => {
    // Split the block into lines and filter out any empty lines
    const lines = block.split("\n").filter((line) => line.trim() !== "");

    // Extract question and answer from the lines
    const questionLine = lines.find((line) =>
      line.startsWith("* **Question:**")
    );
    const answerLine = lines.find((line) => line.startsWith("* **Answer:**"));

    if (questionLine && answerLine) {
      const questionText = questionLine.replace("* **Question:**", "").trim();
      const answerText = answerLine.replace("* **Answer:**", "").trim();

      // Push the extracted question and answer into the flashcards array
      flashcards.push({
        question: questionText,
        answer: answerText,
      });
    }
  });

  return flashcards;
}
