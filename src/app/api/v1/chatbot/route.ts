import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    // Simple mock logic for demo
    let reply = "I'm not sure I understand yet!";
    if (message.toLowerCase().includes("hello"))
      reply = "Hey there! ✈️ Ready for your next adventure?";
    else if (message.toLowerCase().includes("flight"))
      reply = "You can view your flight details in the Dashboard section.";
    else if (message.toLowerCase().includes("baggage"))
      reply = "Your baggage is being tracked securely!";
    else if (message.toLowerCase().includes("thanks"))
      reply = "You're always welcome, traveler 🌍";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chatbot error:", error);
    return NextResponse.json({ reply: "Internal error. Try again later." }, { status: 500 });
  }
}
