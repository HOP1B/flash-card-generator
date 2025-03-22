type QuizAnswer = {
  option: string;
  correct: boolean;
};

type QuizQuestion = {
  question: string;
  answers: QuizAnswer[];
};

export const convertResponseToQna = (inputString: string): QuizQuestion[] => {
  const result: QuizQuestion[] = [];

  // Split input into blocks using "**Question" as the delimiter
  const questions = inputString
    .split(/\*\*Question \d+:.*\*\*/)
    .filter((q) => q.trim() !== "");

  // Loop through the questions and process them
  questions.forEach((questionBlock) => {
    const lines = questionBlock
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length > 0) {
      const questionText = lines[0]; // The first line is the question

      // Extract answers (from lines after the question)
      const answers: QuizAnswer[] = [];
      let isFirstAnswer = true;

      for (let i = 1; i < lines.length; i++) {
        const answerLine = lines[i];
        const answerParts = answerLine.split(":").map((part) => part.trim());

        if (answerParts.length === 2) {
          const answerText = answerParts[1];
          const isCorrect = isFirstAnswer; // Mark the first answer as correct

          answers.push({
            option: answerText,
            correct: isCorrect,
          });

          isFirstAnswer = false; // After the first answer, subsequent ones are incorrect
        }
      }

      // Add the current question with its answers to the result
      result.push({
        question: questionText,
        answers: answers,
      });
    }
  });

  return result;
};
