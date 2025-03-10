import { NextRequest, NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "YouTube URL is required" },
        { status: 400 }
      );
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    const transcript = await getYouTubeTranscript(videoId);
    if (transcript.startsWith("Error")) {
      return NextResponse.json({ error: transcript }, { status: 500 });
    }

    const flashcards = await generateFlashcards(transcript);

    return NextResponse.json({ flashcards }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

function extractVideoId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

async function getYouTubeTranscript(videoId: string): Promise<string> {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const fullTranscript = transcript.map((item) => item.text).join(" ");
    return fullTranscript;
  } catch (error) {
    return `Error: ${(error as Error).message}`;
  }
}

async function generateFlashcards(transcript: string) {
  const chunk_size = 100_000;
  const words = transcript.split(" ");
  const chunks = [];
  for (let i = 0; i < words.length; i += chunk_size) {
    chunks.push(words.slice(i, i + chunk_size).join(" "));
  }
  console.log(transcript);

  const flashcards = [];
  for (const chunk of chunks) {
    const prompt = `
      Analyze the following YouTube transcript and extract key information, and generate a question and answer pair based on the information.

      Transcript:
      ${chunk}

      Instructions:
      1. Summarize the main points.
      2. list key concepts.
      3. Generate a question and answer pair.
    `;

    const response = await model.generateContent(prompt);
    flashcards.push(response.response.text());
  }

  return flashcards;
}
