export default async function handler(req, res) {

  const { messages, model, max_tokens, system } = req.body;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: model || "claude-haiku-4-5-20251001",
      max_tokens: max_tokens || 1000,
      system: system || "You are a master Korean Saju reader. Respond ONLY in valid JSON.",
      messages: messages
    })
  });

  const data = await response.json();

  res.status(200).json(data);

}
