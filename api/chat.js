export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  const prompt = `你是法律助理，以下是四位律師及其專長：
- 林律師：商標、智慧財產權
- 劉律師：一般刑案、陪偵
- 張律師：重大刑案
- 曾律師：民事、家事、調解

請針對以下法律問題，白話解釋並推薦律師：「${message}」`;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "你是台中法律諮詢網站客服" },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await openaiRes.json();
    return res.status(200).json({ text: data.choices?.[0]?.message?.content || "⚠️ 無回覆" });
  } catch (err) {
    console.error("OpenAI 錯誤：", err);
    return res.status(500).json({ error: "伺服器錯誤" });
  }
}
