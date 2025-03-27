export function convertResponseToQna(inputString: string) {
  const qna: {
    question: string;
    answers: { option: string; correct: boolean }[];
  }[] = [];

  // Split the input string by "**Question" and iterate through each question block
  const questionBlocks = inputString.split("**Question").slice(1);

  questionBlocks.forEach((block) => {
    // Split the block into question and answers
    const [questionPart, ...answerParts] = block
      .split("\n")
      .filter((line) => line.trim() !== "");

    // Extract the question text
    const questionText = questionPart.replace(/^\d+:/, "").trim(); // Remove the question number and colon

    const answers: { option: string; correct: boolean }[] = [];

    // Extract the answers
    answerParts.forEach((answerText, index) => {
      const answerMatch = answerText.split(":").map((item) => item.trim());
      const answerOption = answerMatch[1];

      answers.push({
        option: answerOption,
        correct: index === 0, // Assume first answer is correct
      });
    });

    // Push the question and answers to the array
    qna.push({
      question: questionText,
      answers,
    });
  });

  console.log(JSON.stringify(qna, null, 2));

  return qna;
}
