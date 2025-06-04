export interface GeneratedInfo {
  summary: string;
  tags: string[];
}

export async function generateWithVertex(prompt: string, apiKey: string): Promise<GeneratedInfo> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const text = json.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const [summaryLine, tagsLine] = text.split("\n");
    const summary = summaryLine?.replace(/^Summary:\s*/, "") || "";
    const tagsPart = tagsLine?.replace(/^Tags:\s*/, "") || "";
    const tags = tagsPart.split(/,\s*/).filter(Boolean);
    return { summary, tags };
  } catch (err) {
    console.error("Vertex AI request failed", err);
    return { summary: "", tags: [] };
  }
}
