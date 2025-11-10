import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type (Gemini supports JPEG, PNG, WebP, etc.)
    const supportedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/heic",
      "image/heif",
    ];
    if (!supportedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Unsupported file type: ${file.type}` },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    // Use the current stable model (Gemini 2.5 Flash)
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // ✅ Works in 2025
    });

    const prompt = `
You are a baggage inspection AI. Analyze the uploaded image.

Rules:
1. If the image shows a suitcase, luggage, travel bag, or any baggage — check for visible damage (tears, dents, broken wheels, cracks, etc.).
2. If damaged → respond: damaged
3. If intact → respond: not_damaged
4. If the image is NOT baggage (e.g. person, food, animal, random object) → respond: not_baggage

Respond with ONE WORD only. No explanation. No punctuation. No quotes.
`.trim();

    const result = await model.generateContent([
      { inlineData: { data: base64, mimeType: file.type } },
      { text: prompt },
    ]);

    const text = result.response.text().trim().toLowerCase();
    // const status = text.includes("damage") ? "damaged" : "not_damaged";
    // const final_result = text.includes()

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return NextResponse.json(
      {
        error: "Failed to analyze image",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
