// ChatInput.tsx
import { ArrowUp } from "lucide-react";
import { Input } from "./ui/input";
import { askGemini } from "@/lib/gemini";

interface ChatInputProps {
  chatInput: string;
  setChatInput: (value: string) => void;
  chatHistory: any;
  setChatHistory: any;
}

const ChatInput = ({
  chatInput,
  setChatInput,
  setChatHistory,
  chatHistory,
}: ChatInputProps) => {
  const handleAddChatMessage = () => {
    if (!chatInput.trim()) return;

    setChatHistory((prev: any) => [
      ...prev,
      { chatInput: chatInput, sender: "user" },
    ]);

    setTimeout(() => {
      setChatHistory((prev: any) => [
        ...prev,
        { chatInput: "thinking...", sender: "robot" },
      ]);
      askGemini({
        chatHistory: [...chatHistory, { chatInput: chatInput, sender: "user" }],
        setChatHistory,
      });
    }, 600);
    setChatInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddChatMessage();
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      <Input
        type="text"
        placeholder="Send a message to ChatBot"
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        onKeyPress={handleKeyPress}
        className="pr-12 rounded-full border-2 border-gray-200 focus:border-rose-300 focus:ring-rose-200"
      />
      {!chatInput.trim() ? (
        <></>
      ) : (
        <button
          onClick={handleAddChatMessage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-rose-500 hover:bg-rose-600 transition-colors rounded-full text-white w-8 h-8 flex items-center justify-center shadow-sm"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ChatInput;
