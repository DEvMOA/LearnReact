const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function askGemini({ chatHistory, setChatHistory }: any) {
  // Transformer chatHistory pour l'API Gemini avant de l'utiliser
  const formattedChatHistory = chatHistory.map(
    ({ chatInput, sender }: any) => ({
      role: sender === "user" ? "user" : "model",
      parts: [{ text: chatInput }],
    })
  );

  const API_OPTIONS = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: formattedChatHistory,
    }),
  };

  const updateChatHistory = (text: any, isError: boolean = false) => {
    setChatHistory((prev: any) => [
      ...prev.filter((message: any) => message.chatInput !== "thinking..."),
      { sender: "robot", chatInput: text, isError },
    ]);
  };

  try {
    const response = await fetch(endpoint, API_OPTIONS);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (
      !data.candidates ||
      !data.candidates[0] ||
      !data.candidates[0].content
    ) {
      throw new Error("Invalid response structure from Gemini API");
    }

    const text = data.candidates[0].content.parts[0].text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .trim();

    updateChatHistory(text);
  } catch (error) {
    console.error("Erreur Gemini:", error);
    updateChatHistory(
      "Désolé, une erreur est survenue. Veuillez réessayer.",
      true
    );
  }
}
