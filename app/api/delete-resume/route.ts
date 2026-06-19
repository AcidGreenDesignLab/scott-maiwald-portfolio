import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function DELETE() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'Scott_Maiwald_Sr_UIUXAI_Designer.pdf');
    await fs.unlink(filePath);
    return NextResponse.json({ success: true, message: "Resume deleted" });
  } catch (error) {
    console.error("Error deleting resume:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
