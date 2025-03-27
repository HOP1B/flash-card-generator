"use client";
import { PdfUploader } from "./pdfUploader";
import { useState } from "react";
import { Forward, File } from "lucide-react";
import Link from "next/link";
import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";
import { useSession } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";

const CreateLesson = () => {
  const router = useRouter();
  const { session } = useSession();
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  const extractVideoId = (url: string): string => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  const handleFileSelect = (file: File) => {
    setSelectedFiles((prev) => [...prev, file]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedFiles.length && !videoId.trim()) {
      toast.error("Please add a YouTube URL or file to upload");
      setLoading(false);
      return;
    }

    if (selectedFiles.length) {
      setIsUploading(true);
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("pdf", file));
      formData.append("description", description);

      try {
        const response: AxiosResponse = await axios.post(
          "/api/file",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          toast.success("Files uploaded successfully!");
          setDescription("");
          setSelectedFiles([]);
        }
      } catch (error) {
        toast.error("Failed to upload files");
        console.error("Upload error:", error);
      } finally {
        setIsUploading(false);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const removeFile = (fileName: string) => {
    setSelectedFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const generateFlashcards = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<{ id: string }> = await axios.post(
        "/api/youtubeUrl",
        {
          url: `https://www.youtube.com/watch?v=${videoId}`,
          userId: session?.user.id,
          groupId: "dccxYxG1hYsBkRnimj8Nf",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Video response generated successfully!");
      router.replace(`/topics/${response.data.id}/summary`);
    } catch (error: unknown) {
      console.error("API Error:", error);
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.error || "Failed to generate flashcards"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
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
              onChange={(e) => {
                setDescription(e.target.value);
                const id = extractVideoId(e.target.value);
                setVideoId(id);
              }}
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
                  <Link href={`/topics/${id}/questions`}>
                    <Forward style={{ color: "#00072D" }} />
                  </Link>
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

          {videoId && (
            <div className="mt-4 w-[768px]">
              <button
                onClick={generateFlashcards}
                disabled={loading}
                className="bg-[#0353a4] hover:bg-[#023e7d] text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateLesson;
