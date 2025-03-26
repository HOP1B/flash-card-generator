import { Paperclip } from "lucide-react";
import { ChangeEvent } from "react";

interface PdfUploaderProps {
  onPdfSelect: (file: File) => void;
  onFileNameChange: (fileName: string) => void; 
}

export const PdfUploader = ({
  onPdfSelect,
  onFileNameChange,
}: PdfUploaderProps) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onPdfSelect(file);
      onFileNameChange(file.name); 
    }
  };

  return (
    <div className="relative w-6 h-6 group">
      <Paperclip className="w-full h-full text-black group-hover:text-[#0E6BA8] cursor-pointer" />
      <input
        type="file"
        accept=".pdf"
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileChange}
      />
    </div>
  );
};
