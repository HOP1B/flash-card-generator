declare module "youtube-transcript" {
  export class YoutubeTranscript {
    static fetchTranscript(
      videoId: string,
      config?: { lang?: string }
    ): Promise<{ text: string; offset: number; duration: number }[]>;
  }
}
