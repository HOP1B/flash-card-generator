export function convertResponseToQna(response: string) {
  const lines = response.split("\n").filter((line) => line.trim() !== "");
  const qna: {
    question: string;
    answers: { option: string; correct: boolean }[];
  }[] = [];
  let currentQuestion = "";
  let answers: { option: string; correct: boolean }[] = [];

  for (const line of lines) {
    if (/^\d+\.\s*.*\?$/.test(line)) {
      
      if (currentQuestion && answers.length > 0) {
        qna.push({ question: currentQuestion, answers });
      }
      currentQuestion = line.replace(/^\d+\.\s*/, "").trim();
      answers = [];
    } else if (line.startsWith("-")) {
      const option = line.replace(/-\s*/, "").trim();
      const isCorrect = option.includes("(correct)");
      const cleanOption = option.replace(/\s*\(correct\)/, "").trim();
      answers.push({ option: cleanOption, correct: isCorrect });
    }
  }

  if (currentQuestion && answers.length > 0) {
    qna.push({ question: currentQuestion, answers });
  }

  console.log("Parsed QnA:", qna);
  return qna;
}
