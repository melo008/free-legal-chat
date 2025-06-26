export default async function handler(req, res) {
  const { message } = req.body;

  const prompt = `你是法律助理，以下是四位律師及其專長：
- 林律師：商標、智慧財產權
- 劉律師：一般刑案、陪偵
- 張律師：重大刑案
- 曾律師：民事、家事、調解

請針對以下法律問題，白話解釋並推薦律師：「${message}」`;

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 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"
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
  res.status(200).json({ text: data.choices?.[0]?.message?.content || "⚠️ 無回應" });
}
