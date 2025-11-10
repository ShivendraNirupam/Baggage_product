import { NextRequest, NextResponse } from "next/server";

let storedData: any = null; 

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    storedData = data;
    console.log("Received form data:", storedData);
    return NextResponse.json({ message: "Form data received successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET() {
  if (!storedData) {
    return NextResponse.json({ message: "No data available yet." });
  }
  return NextResponse.json(storedData);
}
