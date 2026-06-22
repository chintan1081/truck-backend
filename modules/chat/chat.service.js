import { config } from "../../config/env";
import { badRequest } from "../../shared/http-error";
const SYSTEM_INSTRUCTION = "You are Logigpt, a highly expert transport chatbot inside FlyAsh Logistics Pro. " +
    "Help user draft policy messages, answer driver wage questions, explain diesel margins, " +
    "analyze insurance policies, and optimize route delivery formats. Answer in conversational " +
    "markdown format. Use bold headers, clean lists, and numeric metrics.";
const FALLBACK_REPLY = "No **GEMINI_API_KEY** environment variable detected on the server.\n\n" +
    "But as a highly intelligent simulated fallback, I can still draft and analyze transport " +
    "operations! Ask me about fuel costs, insurance tracking, or documents like driver permits.";
/**
 * Generates an assistant reply for a chat transcript. Falls back to a canned
 * message when no Gemini API key is configured so the feature degrades gracefully.
 */
export async function generateChatReply(messages) {
    if (!Array.isArray(messages)) {
        throw badRequest("Messages array is required.");
    }
    if (!config.gemini.apiKey) {
        return FALLBACK_REPLY;
    }
    const { GoogleGenAI } = await import("@google/genai");
    const ai = new GoogleGenAI({
        apiKey: config.gemini.apiKey,
        httpOptions: { headers: { "User-Agent": "aistudio-build" } },
    });
    const contents = messages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
    }));
    const response = await ai.models.generateContent({
        model: config.gemini.model,
        contents,
        config: { systemInstruction: SYSTEM_INSTRUCTION },
    });
    return response.text ?? "";
}
/**
 * Generates executive financial insights for the dashboard. The Gemini API key
 * lives only on the server; the frontend calls this endpoint instead of Gemini.
 */
export async function generateFinancialInsights(data) {
    if (!config.gemini.apiKey) {
        return "The intelligence engine is currently offline (API key missing).";
    }
    const { GoogleGenAI } = await import("@google/genai");
    const ai = new GoogleGenAI({ apiKey: config.gemini.apiKey });
    const response = await ai.models.generateContent({
        model: config.gemini.model,
        contents: "Analyze logistics financial data. Provide 3 high-impact executive insights on profitability, " +
            `fuel efficiency, and accounts receivable aging: ${JSON.stringify(data)}. Keep it professional and concise.`,
        config: { temperature: 0.7, topP: 0.95 },
    });
    return response.text ?? "No insights generated.";
}
/** OCRs a diesel bill photo and returns the extracted fields as JSON. */
export async function parseDieselBillImage(base64Image) {
    if (typeof base64Image !== "string" || base64Image.length === 0) {
        throw badRequest("image (base64 string) is required.");
    }
    if (!config.gemini.apiKey) {
        return null;
    }
    const { GoogleGenAI } = await import("@google/genai");
    const ai = new GoogleGenAI({ apiKey: config.gemini.apiKey });
    const response = await ai.models.generateContent({
        model: config.gemini.model,
        contents: {
            parts: [
                { inlineData: { mimeType: "image/jpeg", data: base64Image } },
                { text: "Extract strictly: Petrol Pump Name, Liters, Rate per Liter, Total Amount. Return JSON format only." },
            ],
        },
        config: { responseMimeType: "application/json" },
    });
    try {
        return JSON.parse(response.text?.trim() || "{}");
    }
    catch {
        return null;
    }
}
/** True when a Gemini error is a rate-limit/quota exhaustion. */
export function isQuotaError(err) {
    const e = err;
    return (e?.status === "RESOURCE_EXHAUSTED" ||
        e?.status === 429 ||
        (typeof e?.message === "string" && e.message.includes("429")));
}
