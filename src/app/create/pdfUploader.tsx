import { Paperclip } from "lucide-react";
export const PdfUploader = () => {
  return (
    <div className="relative">
      <Paperclip />
      <input type="file" accept="PDF/*" className="absolute opacity-0" />
    </div>
  );
};
