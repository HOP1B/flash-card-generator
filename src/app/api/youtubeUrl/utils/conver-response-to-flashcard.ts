export function convertResponseToFlashcard(response: string) {
  const lines = response.split("\n").filter((line) => line.trim() !== "");
  const flashcards: { question: string; answer: string }[] = [];
  let currentQuestion = "";
  let currentAnswer = "";

  for (const line of lines) {
    if (line.startsWith("Q: ")) {
      if (currentQuestion && currentAnswer) {
        flashcards.push({ question: currentQuestion, answer: currentAnswer });
      }
      currentQuestion = line.replace("Q: ", "").trim();
      currentAnswer = "";
    } else if (line.startsWith("A: ")) {
      currentAnswer = line.replace("A: ", "").trim();
    }
  }

  if (currentQuestion && currentAnswer) {
    flashcards.push({ question: currentQuestion, answer: currentAnswer });
  }

  console.log("Parsed flashcards:", flashcards);
  return flashcards;
}
