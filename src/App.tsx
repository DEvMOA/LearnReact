import { ArrowDown } from "lucide-react";
import ChatInput from "./components/ChatInput";
import { useState, useRef, useEffect } from "react";
import ChatMessage from "./components/ChatMessage";

interface ChatHistoryType {
  chatInput: string;
  sender: "robot" | "user";
  isError?: boolean;
}

function App() {
  const [chatInput, setChatInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatHistoryType[]>([
    { chatInput: "Hey there! How can I help you?", sender: "robot" },
  ]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll automatique vers le bas quand un nouveau message est ajouté
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Bouton flottant pour ouvrir/fermer le chat */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-rose-500 hover:bg-rose-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        </button>
      )}

      {/* Popup du chatbot */}
      {isOpen && (
        <div className="w-80 bg-white rounded-lg shadow-2xl border border-gray-200 animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="flex justify-between items-center bg-rose-500 p-3 rounded-t-lg">
            <div className="flex items-center gap-2">
              <img
                src="/logo.svg"
                alt="logo"
                className="w-8 bg-white rounded-sm p-1"
              />
              <h2 className="font-bold font-mono text-lg text-white">
                Chatbot
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-rose-600 rounded-full p-1 transition-colors"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div
            ref={chatContainerRef}
            className="p-4 space-y-4 bg-gray-50 h-96 overflow-y-auto scroll-smooth scrollbar-transparent"
          >
            {chatHistory.map((chat, index) => (
              <ChatMessage
                message={chat.chatInput}
                sender={chat.sender}
                isError={chat.isError}
                key={index}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 bg-white rounded-b-lg">
            <ChatInput
              chatInput={chatInput}
              setChatInput={setChatInput}
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
