export function convertResponseToFlashcard(inputString: string) {
  const flashcards: { question: string; answer: string }[] = [];

  // Split the input into sections at each "**Flashcard" occurrence
  const flashcardSections = inputString.split("**Flashcard").slice(1); // Remove first split part (intro text)

  flashcardSections.forEach((section) => {
    const lines = section.split("\n").map((line) => line.trim());

    let question = "";
    let answer = "";

    for (const line of lines) {
      if (line.startsWith("* **Question")) {
        question = line.replace(/\* \*\*Question \d+:\*\* /, "").trim();
      } else if (line.startsWith("* **Answer")) {
        answer = line.replace(/\* \*\*Answer \d+:\*\* /, "").trim();
      }
    }

    if (question && answer) {
      flashcards.push({ question, answer });
    }
  });

  return flashcards;
}
