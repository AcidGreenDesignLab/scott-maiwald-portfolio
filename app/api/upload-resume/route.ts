import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    
    // Check if it's a PDF
    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      return NextResponse.json({ error: "File must be a PDF" }, { status: 400 });
    }
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uploadDir = path.join(process.cwd(), 'public');
    
    // Ensure public directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filePath = path.join(uploadDir, 'resume.pdf');
    fs.writeFileSync(filePath, buffer);
    
    return NextResponse.json({ success: true, message: "Resume uploaded successfully" });
  } catch (error) {
    console.error("Error uploading resume:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
