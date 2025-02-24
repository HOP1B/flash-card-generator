import { FileImage } from "lucide-react";

export const ImageUploader = () =>{
    return (
      <div className="relative">
        <FileImage />
        <input type="file" accept="image/*" className="absolute opacity-0" />
      </div>
    );
}