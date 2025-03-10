"use client";
import { PdfUploader } from "./pdfUploader";
import { useState } from "react";
import { Forward } from "lucide-react";
import Link from "next/link";
import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";
import { File } from "lucide-react";

const CreateLesson = () => {
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFiles((prev) => [...prev, file]);
  };

  const handleSubmit = async () => {
    if (!selectedFiles.length && !description.trim()) {
      toast.error("Please add a description or file to upload");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("pdf", file));
    formData.append("description", description);

    try {
      const response: AxiosResponse = await axios.post("/api/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
    }
  };

  const removeFile = (fileName: string) => {
    setSelectedFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  return (
    <>
      <header className="flex gap-2 mt-4 px-6">
        <Link href={"/"}>home / </Link>
        <p className="font-bold"> New lesson</p>
      </header>
      <div className="min-h-screen w-full flex justify-center items-center flex-col">
        <div className="flex flex-col items-center gap-2 m-7">
          <h1 className="font-bold text-2xl">Create a lesson</h1>
          <p>Add PDFs and YouTube links.</p>
        </div>
        <div>
          <div className="relative">
            <textarea
              value={description}
              className="resize-none border text-foreground p-4 w-[768px] h-[165px] rounded-xl"
              placeholder="Example: Paste a YouTube link or something"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="absolute flex bottom-4 left-5 gap-[675px] items-center">
              <PdfUploader
                onPdfSelect={(file) => handleFileSelect(file)}
                onFileNameChange={() => {}}
              />
              <button
                onClick={handleSubmit}
                disabled={isUploading}
                className="rounded-full bg-[#caf0f8] h-9 w-9 border items-center justify-center flex border-[#0E6BA8] disabled:opacity-50"
              >
                <Forward style={{ color: "#0E6BA8" }} />
              </button>
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
        </div>
      </div>
    </>
  );
};

export default CreateLesson;
