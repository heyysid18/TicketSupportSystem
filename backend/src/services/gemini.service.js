const { GoogleGenerativeAI } = require('@google/generative-ai');

const FALLBACK = {
  suggested_priority: 'Medium',
  suggested_category: 'General',
  reasoning: 'AI classification unavailable',
};

const classifyTicket = async (subject, message) => {
  if (!process.env.GEMINI_API_KEY) return FALLBACK;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a support ticket classifier. Analyze the ticket below and respond ONLY with a valid JSON object — no markdown, no extra text.

Subject: ${subject}
Message: ${message}

Respond with exactly this structure:
{
  "suggested_priority": "Low" | "Medium" | "High",
  "suggested_category": "Billing" | "Technical" | "Account" | "General",
  "reasoning": "one short sentence"
}`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim().replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(raw);

    const validPriorities = ['Low', 'Medium', 'High'];
    const validCategories = ['Billing', 'Technical', 'Account', 'General'];

    return {
      suggested_priority: validPriorities.includes(parsed.suggested_priority)
        ? parsed.suggested_priority
        : 'Medium',
      suggested_category: validCategories.includes(parsed.suggested_category)
        ? parsed.suggested_category
        : 'General',
      reasoning: parsed.reasoning || '',
    };
  } catch (err) {
    console.error('Gemini classification error:', err.message);
    return FALLBACK;
  }
};

module.exports = { classifyTicket };
