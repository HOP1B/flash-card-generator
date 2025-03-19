import { GoogleGenerativeAI } from "@google/generative-ai";
import { transcript } from "./shared";

export const getSummaryPrompt = (transcript: string) => {
  const prompt = `
      Analyze the following YouTube transcript and provide a structured summary of this video/text, breaking down the main themes and key points with clear analysis and organization

      Transcript:
      ${transcript}

      Format template:
        Summarizing and organizing information from a video or text.
        Analyzing and explaining the content in a structured way.
        Breaking down complex information into key points.
        Identifying and highlighting the main themes and subtopics.
    `;
  return prompt;
};

const response =
  "***Structured Summary***\n" +
  "\n" +
  "\n" +
  "**Title**: Life Without Sunlight: The Consequences of a Volcanic Winter\n" +
  "\n" +
  "\n" +
  "**Main Theme**: The video explores the devastating effects of a hypothetical scenario where a massive volcanic eruption blocks sunlight, plunging humanity into a perpetual state of darkness. \n" +
  "\n" +
  "\n" +
  "**Key Points**:\n" +
  "\n" +
  "**Immediate Health Impacts**:\n" +
  "- Within 7 days, 50% of the population suffers from acute depression.\n" +
  "- A 75% increase in cancer risk.\n" +
  "- A 32% increase in stroke cases.\n" +
  "- A doubling of the risk of diabetes.\n" +
  "- Vitamin D deficiency is massive, and bones become weak.\n" +
  "\n" +
  "**Necessity of Vitamin Supplementation**:\n" +
  "- The video emphasizes the importance of stocking up on vitamins rather than just canned food.\n" +
  "- Vitamin D is essential for calcium absorption and bone health.\n" +
  "\n" +
  "**Shift to Underground Living**:\n" +
  "- Humanity is forced to move underground to survive.\n" +
  "- Adaptation to a sunless existence is crucial.\n" +
  "\n" +
  "**Technological Solutions for Sustenance**:\n" +
  "- Reliance on science and technology for food production.\n" +
  "- Mushroom and hydroponic farms become essential.\n" +
  "- 3D printers are used to create food.\n" +
  "\n" +
  "**Hormonal and Physiological Changes**:\n" +
  "- Disruption of the body's circadian rhythm due to the absence of day and night.\n" +
  "- Hormonal imbalances lead to obesity.\n" +
  "- Leptin hormone reduction by 80%, leads to a 44% increase in food consumption.\n" +
  "- Increased risk of bone fractures.\n" +
  "\n" +
  "**Narrative Twist**:\n" +
  "- The scenario is revealed to be a global experiment orchestrated by a 'main villain.'\n" +
  "- The main character 'Arnold' is the hero who saves mankind.\n" +
  "\n" +
  "**Analysis**:\n" +
  "- The video uses a dramatic, hypothetical scenario to highlight the vital role of sunlight in human health and survival.\n" +
  "- It emphasizes the interconnectedness of physical and mental well-being with environmental factors.\n" +
  "- The video also showcases the potential of technology to mitigate the effects of environmental disasters.\n" +
  "- The video uses a story-like narrative to make the science more engaging.\n";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);
const ai = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const summaryModel = ai.startChat({
  generationConfig: {
    temperature: 0.85,
    topP: 0.95,
    topK: 40,
    responseMimeType: "text/plain",
  },
  history: [
    {
      role: "user",
      parts: [
        {
          text: getSummaryPrompt(transcript),
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: response,
        },
      ],
    },
  ],
});
