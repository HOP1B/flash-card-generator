import { getSummaryPrompt, summaryModel } from "../models/summary-model";

export async function generateSummary(
  transcript: string
): Promise<{ title: string; content: string }[]> {
  const response = await summaryModel.sendMessage(getSummaryPrompt(transcript));
  const summaryText = await response.response.text();
  console.log("AI Response (raw):", summaryText);

  // Test the regex explicitly
  const titleRegex = /\*\*Title\*\*[:\s]*(.+?)(?=\n|$)/i;
  console.log("Title Regex:", titleRegex);
  const titleMatch = summaryText.match(titleRegex);
  const title = titleMatch ? titleMatch[1].trim() : "Untitled";
  console.log("Title Match:", titleMatch);
  console.log("Extracted Title:", title);

  // Test content extraction explicitly
  const mainThemeMarker = "**Main Theme**:";
  const contentStartIndex = summaryText.indexOf(mainThemeMarker);
  console.log("Main Theme Marker:", mainThemeMarker);
  console.log("Content Start Index:", contentStartIndex);

  const content =
    contentStartIndex !== -1
      ? summaryText.slice(contentStartIndex).trim()
      : summaryText.replace(titleMatch ? titleMatch[0] : "", "").trim() ||
        "No main theme available";
  console.log("Extracted Content:", content);

  return [{ title, content }];
}
