// Import the necessary components from the Google Generative AI SDK
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerationConfig, // Optional import for type clarity
} from "@google/generative-ai";

// Updated function signature to accept the API key
export async function generateRizzReply(
  message: string,
  mood: string
): Promise<string> {
  try {
    // Initialize the Google Generative AI client with the API key
    const genAI = new GoogleGenerativeAI(
      "AIzaSyDEDlHfK6Xp-KSZyWru_y6_10PGoT3gvy0"
    );

    // Select the model (gemini-pro is a good choice for this task)
    // Other models like 'gemini-1.5-flash' (faster, potentially less nuanced) or
    // 'gemini-1.5-pro' (more capable) could also be used.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Create the prompt (same as your original logic)
    const prompt = `
      I need a flirty reply to send to someone I'm interested in.

      Their message: "${message}"

      Please generate a ${mood.toLowerCase()} reply that's flirty and charming.
      The reply should be:

      - If "Funny": Witty and humorous with a flirty undertone
      - If "Sweet": Warm, genuine, and subtly flirty
      - If "Bold": Confident and direct, but not inappropriate
      - If "Flirty": Playful and suggestive, but tasteful
      - If "Over the Top": Dramatic and exaggerated in a fun way

      Keep it under 3 sentences and make it sound natural. Don't use any emojis - I'll add those myself.
      Only return the reply text, nothing else.
      `;

    // Define generation configuration
    const generationConfig: GenerationConfig = {
      temperature: 0.7,
      maxOutputTokens: 150, // Note: Parameter name change from maxTokens
      // You can add other parameters like topP, topK if needed
      // topP: 1,
      // topK: 1,
    };

    // Define safety settings (recommended to prevent harmful content)
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    // Generate the reply using the Google Generative AI SDK
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }], // Structure the prompt
      generationConfig,
      safetySettings,
    });

    // Extract the text response
    // Add error handling in case the response or text is unexpectedly missing
    const response = result.response;
    if (!response) {
      throw new Error("No response received from the AI model.");
    }
    const text = response.text();

    // Clean up the response and return it
    return text.trim();
  } catch (error) {
    console.error(
      "Error generating rizz reply with Google Generative AI:",
      error
    );
    // Check for specific API key errors
    if (
      error instanceof Error &&
      (error.message.includes("API key not valid") ||
        error.message.includes("permission denied"))
    ) {
      throw new Error("Invalid or unauthorized Google API Key provided.");
    }
    // Check for blocked content due to safety settings
    if (
      error instanceof Error &&
      error.message.includes("blocked due to safety")
    ) {
      console.warn("AI response blocked due to safety settings.");
      // You might want to return a fallback message or re-throw a specific error
      throw new Error("Could not generate reply due to safety restrictions.");
    }
    throw new Error("Failed to generate reply using Google Generative AI");
  }
}
