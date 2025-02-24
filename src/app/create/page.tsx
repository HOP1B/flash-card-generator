"use client";
import { ImageUploader } from "./imageUploader";
import { PdfUploader } from "./pdfUploader";
import { useState } from "react";
import { Forward } from "lucide-react";
import Link from "next/link";

const CreateLesson = () => {
    const [description, setDescription] = useState("");
  return (
    <>
      <header className="flex gap-2 mt-4 px-6">
        <Link href={"/"}>home / </Link>
        <p className="font-bold"> New lesson</p>
      </header>
      <div className="min-h-screen w-full flex justify-center items-center flex-col ">
        <div className="flex flex-col items-center gap-2 m-7">
          <h1 className="font-bold text-2xl">Create a lesson</h1>
          <p>Add PDFs, YouTube links, camera photos. </p>
        </div>
        <div>
          <div className="relative">
            <textarea
              value={description}
              className="resize-none border text-foreground p-4 w-[768px] h-[165px] rounded-xl "
              placeholder="Example: Paste a YouTube link or something"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
            <div className="absolute flex bottom-4 left-5 gap-[630px] items-center">
              <div className="flex gap-4">
                <ImageUploader />
                <PdfUploader />
              </div>
              <button className="rounded-full bg-[#caf0f8] h-9 w-9 border items-center justify-center flex border-[#0E6BA8]">
                <Forward style={{ color: "#0E6BA8" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateLesson;
