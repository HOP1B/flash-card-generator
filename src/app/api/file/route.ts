import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();


    const pdf = formData.get("pdf") as File | null;
    const description = formData.get("description") as string;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    
    await mkdir(uploadDir, { recursive: true });


    if (pdf) {
      const pdfBuffer = Buffer.from(await pdf.arrayBuffer());
      const pdfName = `${Date.now()}-${pdf.name}`;
      const pdfPath = path.join(uploadDir, pdfName);
      await writeFile(pdfPath, pdfBuffer);
    }


    if (pdf && !pdf.type.includes("pdf")) {
      return NextResponse.json({ error: "Invalid PDF type" }, { status: 400 });
    }

    console.log({
      description,
      pdf: pdf ? pdf.name : null,
    });

    return NextResponse.json(
      { message: "Files uploaded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload files" },
      { status: 500 }
    );
  }
};
