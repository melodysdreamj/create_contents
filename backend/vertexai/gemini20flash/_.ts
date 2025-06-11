import { VertexAI } from "@google-cloud/vertexai";
import dotenv from "dotenv";

dotenv.config();

const project = process.env.VERTEX_AI_PROJECT_ID;
const location = process.env.VERTEX_AI_LOCATION;

if (!project || !location) {
  throw new Error(
    "VERTEX_AI_PROJECT_ID and VERTEX_AI_LOCATION must be set in the environment variables"
  );
}

const vertexAI = new VertexAI({ project, location });

export async function requestGemini20Flash(
  prompt: string
): Promise<string | null> {
  try {
    // Instantiate the models
    const generativeModel = vertexAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const req = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    };

    const resp = await generativeModel.generateContent(req);

    if (!resp.response.candidates?.length) {
      return null;
    }

    const text = resp.response.candidates[0].content.parts[0].text;

    return text ?? null;
  } catch (error) {
    console.error("Error in requestGemini20Flash:", error);
    return null;
  }
}
