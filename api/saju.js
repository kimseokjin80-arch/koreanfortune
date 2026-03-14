export default async function handler(req, res) {

  const { prompt } = req.body;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-latest",
      max_tokens: 1000,
      messages: [
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();

  res.status(200).json(data);

}
