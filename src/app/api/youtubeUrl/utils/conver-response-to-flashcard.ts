type FlashcardQuestion = {
  question: string;
  answer: string;
};

export const convertResponseToFlashcard = (
  inputString: string
): FlashcardQuestion[] => {
  const result: FlashcardQuestion[] = [];

  // Split into lines and filter out empty ones
  const lines = inputString
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  let currentQuestion = "";
  for (const line of lines) {
    // Match questions like "**Question X:** [text]"
    const questionMatch = line.match(/^\*\*Question \d+:\*\*\s*(.+)$/i);
    if (questionMatch) {
      currentQuestion = questionMatch[1].trim();
      continue;
    }

    // Match answers like "**Answer X:** [text]"
    const answerMatch = line.match(/^\*\*Answer \d+:\*\*\s*(.+)$/i);
    if (answerMatch && currentQuestion) {
      const answerText = answerMatch[1].trim();
      result.push({
        question: currentQuestion,
        answer: answerText,
      });
      currentQuestion = ""; // Reset for next pair
    }
  }

  return result;
};
