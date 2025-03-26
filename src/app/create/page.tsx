"use client";
import { PdfUploader } from "./pdfUploader";
import { useState } from "react";
import { Forward, File } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { extractVideoId } from "@/app/api/youtubeUrl/utils/extract-video-id";

const CreateLesson = () => {
  const router = useRouter();
  const { session } = useSession();
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFiles((prev) => [...prev, file]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedFiles.length) {
      toast.error("Please upload a file if no YouTube URL is provided");
      setLoading(false);
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("pdf", file));
    formData.append("description", description);

    try {
      const response = await axios.post("/api/file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.id) {
        toast.success("Files uploaded successfully!");
        router.push(`/topics/${response.data.id}`);
      }
    } catch (error) {
      toast.error("Failed to upload files");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
      setLoading(false);
    }
  };

  const removeFile = (fileName: string) => {
    setSelectedFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const generateFromYouTube = async (url: string) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to generate materials");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/youtubeUrl", {
        url,
        userId: session.user.id,
        groupId: "dccxYxG1hYsBkRnimj8Nf", 
      });

      if (response.data?.id) {
        toast.success("Learning materials created!");
        router.push(`/topics/${response.data.id}/flashcard`); 
      }
    } catch (error) {
      toast.error("Failed to generate materials");
      console.error("Generation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDescription(value);
    const id = extractVideoId(value);
    setVideoId(id || "");

    if (id) {
      generateFromYouTube(`https://www.youtube.com/watch?v=${id}`);
    }
  };

  return (
    <>
      <header className="flex mt-4 px-6">
        <Link href={"/dashboard"}>home/</Link>
        <p className="font-bold"> New</p>
      </header>
      <div className="min-h-screen flex justify-center items-center flex-col w-full">
        <div className="flex flex-col items-center justify-center gap-2 m-7">
          <h1 className="font-bold text-2xl">
            Create a Flashcard, Quiz and Summary
          </h1>
          <p>Add PDFs and YouTube links.</p>
        </div>
        <div>
          <div className="relative">
            <textarea
              value={description}
              className="resize-none border text-foreground p-4 w-[768px] h-[165px] rounded-xl"
              placeholder="Paste a YouTube link"
              onChange={handleDescriptionChange}
              disabled={loading}
            />
            <div className="absolute flex bottom-4 left-5 gap-2 items-center">
              <PdfUploader
                onPdfSelect={handleFileSelect}
                onFileNameChange={() => {}}
              />
              {selectedFiles.length > 0 && (
                <button
                  onClick={handleSubmit}
                  disabled={isUploading || loading}
                  className="rounded-full bg-[#caf0f8] h-9 w-9 items-center justify-center flex disabled:opacity-50"
                >
                  <Forward style={{ color: "#00072D" }} />
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 w-[768px] flex flex-col gap-2">
            {selectedFiles.map((file) => (
              <div
                key={file.name}
                className="flex items-center gap-2 p-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                <File className="text-red-500 w-5 h-5" />
                <span className="text-sm text-gray-800 break-all">
                  {file.name}
                </span>
                <button
                  onClick={() => removeFile(file.name)}
                  className="ml-auto text-red-500 hover:text-red-700 text-sm"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {loading && (
            <div className="mt-4 w-[768px]">
              <p className="text-gray-500">Generating materials...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateLesson;
