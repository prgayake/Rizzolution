import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {
    const { message, mood } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create a prompt that instructs the AI to generate a flirty reply
    const prompt = `
      I need a flirty reply to send to someone I'm interested in. 
      
      Their message: "${message}"
      
      Please generate a ${
        mood?.toLowerCase() || "flirty"
      } reply that's flirty and charming. 
      The reply should be:
      
      - If "Funny": Witty and humorous with a flirty undertone
      - If "Sweet": Warm, genuine, and subtly flirty
      - If "Bold": Confident and direct, but not inappropriate
      - If "Flirty": Playful and suggestive, but tasteful
      - If "Over the Top": Dramatic and exaggerated in a fun way
      
      Keep it under 3 sentences and make it sound natural. Don't use any emojis - I'll add those myself.
      Only return the reply text, nothing else.
    `;

    // Generate the reply using the AI SDK
    const { text } = await generateText({
      model: google("gemini-2.5-pro-preview-03-25"),
      prompt: prompt,
      temperature: 0.7, // Add some creativity
      maxTokens: 150,
    });

    return new Response(JSON.stringify({ reply: text.trim() }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate route:", error);
    return new Response(JSON.stringify({ error: "Failed to generate reply" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
