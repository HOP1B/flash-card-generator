type Summary = {
  option: string;
};

export const convertResponseToSummary = (inputString: string): Summary[] => {
  const result: Summary[] = [];

  // Split the input into blocks by the "**Key Points**" or any significant section divider
  const sections = inputString
    .split("**") // splitting by '**' to get each important block
    .filter((section) => section.trim() !== "");

  // Loop through the sections and process them
  sections.forEach((section) => {
    const lines = section
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length > 0) {
      const optionText = lines.join(" "); // Join lines to create one summary block

      result.push({
        option: optionText,
      });
    }
  });

  return result;
};
