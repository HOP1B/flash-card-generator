import { YoutubeTranscript } from "youtube-transcript";

export async function getYouTubeTranscript(videoId: string): Promise<string> {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    return transcript.map((item) => item.text).join(" ");
  } catch (error) {
    throw new Error(`Failed to fetch transcript: ${(error as Error).message}`);
  }
}
 