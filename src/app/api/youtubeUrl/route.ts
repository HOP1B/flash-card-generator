import { NextRequest, NextResponse } from "next/server";
import {
  convertResponseToQna,
  extractVideoId,
  generateFlashcards,
  generateQuizzes,
  getYouTubeTranscript,
} from "./utils";

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
    const rawQuizzes = (await generateQuizzes(transcript)).slice(1);
    const rawFlashcards = (await generateFlashcards(transcript)).slice(1)
    const quizzes = rawQuizzes
      .map((flashcard) => convertResponseToQna(flashcard))
      .flat();
    console.log(JSON.stringify(quizzes, null, 2));
    const flashcards = rawFlashcards
      .map((flashcard) => convertResponseToQna(flashcard))
      .flat();
    console.log(JSON.stringify(flashcards, null, 2));

    return NextResponse.json({ flashcards: [] }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
