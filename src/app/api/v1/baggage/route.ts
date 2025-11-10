import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }

    // Convert to binary buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ✅ Use a stable model endpoint
    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/vit-base-patch16-224",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
        body: buffer,
      }
    );

    if (!response.ok) {
      console.error("Hugging Face API error:", response.status);
      return NextResponse.json(
        { error: `Failed to analyze image. Status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    // Example: [{ label: "suitcase", score: 0.93 }, { label: "backpack", score: 0.04 }]
    let result = data?.[0]?.label || "Unknown object";

    // Roughly interpret for condition
    let condition = "The baggage appears intact.";
    const label = result.toLowerCase();
    if (label.includes("damaged") || label.includes("broken")) {
      condition = "The baggage appears damaged.";
    } else if (label.includes("dirty")) {
      condition = "The baggage looks dirty.";
    }

    return NextResponse.json({ condition, label: result });
  } catch (error) {
    console.error("Error analyzing baggage:", error);
    return NextResponse.json(
      { error: "Failed to analyze baggage condition." },
      { status: 500 }
    );
  }
}
