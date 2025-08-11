const ChatMessage = ({
  message,
  sender,
  isError = false,
}: {
  message: string;
  sender: string;
  isError?: boolean;
}) => {
  return (
    <>
      {sender === "robot" && (
        <div className="flex items-start space-x-2">
          <img
            src="src/assets/robot.png"
            alt="robot"
            className="w-8 h-8 rounded-full"
          />
          <div
            className={`rounded-lg p-3 shadow-sm border max-w-xs ${
              isError ? "bg-red-50 border-red-200" : "bg-white border-gray-200"
            }`}
          >
            <p className={`${isError ? "text-red-700" : "text-gray-800"}`}>
              {message}
            </p>
          </div>
        </div>
      )}
      {sender === "user" && (
        <div className="flex items-start space-x-2 justify-end">
          <div className="bg-rose-500 text-white rounded-lg p-3 shadow-sm border max-w-xs">
            <p>{message}</p>
          </div>
          <img
            src="src/assets/user.png"
            alt="user"
            className="w-8 h-8 rounded-full"
          />
        </div>
      )}
    </>
  );
};

export default ChatMessage;
