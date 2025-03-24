import { getSummaryPrompt, summaryModel } from "../models/summary-model";

export async function generateSummary(
  transcript: string
): Promise<{ title: string; content: string }[]> {
  const response = await summaryModel.sendMessage(getSummaryPrompt(transcript));
  const summaryText = await response.response.text();
  // Extract the title correctly (ignores "Main Theme" or other headers)
  const titleRegex = /(?:\*\*Title:\*\*|^Title:)\s*(.+)/im;
  const titleMatch = summaryText.match(titleRegex);
  const title = titleMatch ? titleMatch[1].trim() : "Untitled";


  // Remove title line from content
  const contentWithoutTitle = summaryText.replace(titleRegex, "").trim();
 
  return [{ title, content: contentWithoutTitle }];
}
