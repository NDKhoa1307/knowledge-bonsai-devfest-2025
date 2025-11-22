import { useState, useEffect, useRef } from "react";
import { type KnowledgeTreeData } from "../../data/mockData";
import { type Message } from "./types";
import { ChatHeader } from "./ChatHeader";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { ChatInput } from "./ChatInput";
import { sendChatMessage, shouldUseMockMode } from "../../service/chatService";

interface ChatBoxProps {
  username: string;
  onTreeGenerated?: (treeData: string) => void;
}

export const ChatBox = ({ username, onTreeGenerated }: ChatBoxProps) => {
  // --- Logic State ---
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- Initialization Logic ---
  useEffect(() => {
    const useMockMode = shouldUseMockMode();

    if (useMockMode) {
      console.log("✅ [MOCK MODE ACTIVE] - No backend connection, using local mock data");
      setIsConnected(true);
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        username: "Bonsai Guide",
        content: {
          text: "Greetings! I am your Knowledge Bonsai guide. 🌱\n\nTell me, what seed of knowledge would you like to plant today? (e.g., 'I want to learn React')",
        },
        timesend: new Date().toISOString(),
        isAI: true,
      };
      setMessages([welcomeMessage]);
      return;
    }

    // Backend mode - using HTTP API
    const backendUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
    console.log("🌐 [BACKEND MODE] Ready to send messages to:", backendUrl);
    console.log("📡 Using HTTP POST API endpoint: /trees");

    setIsConnected(true);
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      username: "Bonsai Guide",
      content: {
        text: "Greetings! I am your Knowledge Bonsai guide. 🌱\n\nTell me, what seed of knowledge would you like to plant today?",
      },
      timesend: new Date().toISOString(),
      isAI: true,
    };
    setMessages([welcomeMessage]);
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Logic to Handle Send
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      username,
      content: { text: inputMessage },
      timesend: new Date().toISOString(),
      isAI: false,
    };

    // Console log user message
    console.log("📤 [User Message] Sending message...");
    console.log("🆔 Message ID:", newMessage.id, "(Generated from Date.now() - Unix timestamp in milliseconds)");
    console.log("👤 Username:", username);
    console.log("💬 Message:", inputMessage);
    console.log("⏰ Timestamp:", newMessage.timesend);
    console.log("📋 Full message object:", newMessage);
    console.log("---");

    setMessages((prev) => [...prev, newMessage]);
    // Only get the user messages separately
    const filteredUserMessages = messages.filter((msg) => !msg.isAI);
    if (filteredUserMessages.length > 3) {
      filteredUserMessages.splice(0, filteredUserMessages.length - 3); // Keep only last 3
    }
    const messageText = inputMessage;
    setInputMessage("");
    setIsTyping(true);

    const useMockMode = shouldUseMockMode();

    if (useMockMode) {
      console.log("🎭 [MOCK MODE] Generating mock AI response locally");
      console.log(
        "📄 [MOCK DATA] Simulated request:",
        JSON.stringify(
          {
            username: username,
            content: { text: messageText },
          },
          null,
          2
        )
      );
      setTimeout(() => handleMockAIResponse(messageText), 1500);
    } else {
      // Call backend HTTP API
      try {
        console.log("🌐 [BACKEND MODE] Calling HTTP API...");
        const response = await sendChatMessage(username, messageText, filteredUserMessages);

        console.log("✅ [ChatBox] Backend response received:", response);

        // Create AI response message from backend
        const aiMessage: Message = {
          id: Date.now().toString(),
          username: "Bonsai Guide",
          content: {
            text: response.message || response.data?.message || "🌱 Knowledge tree generated successfully!",
          },
          timesend: new Date().toISOString(),
          isAI: true,
        };

        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);

        const isNeedMoreInfo = response.treeData?.needMoreInfo;
        if (isNeedMoreInfo) {
          console.log("ℹ️ [ChatBox] Backend indicates more info is needed before tree generation.");
        } else {
          if (response?.id && onTreeGenerated) {
            // If tree data is returned, check if the tree id is provided and trigger callback
            console.log("🌳 [ChatBox] Tree id received, triggering onTreeGenerated callback");
            const id = response.id;
            onTreeGenerated(id);
          }
        }
      } catch (error) {
        console.error("❌ [ChatBox] Failed to send message to backend:", error);
        setIsTyping(false);

        // Show error message to user
        const errorMessage: Message = {
          id: Date.now().toString(),
          username: "System",
          content: {
            text: "⚠️ Failed to connect to the backend. Please check your connection and try again.",
          },
          timesend: new Date().toISOString(),
          isAI: true,
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    }
  };

  // Mock AI Logic (Simplified for UI demo)
  const handleMockAIResponse = (userMessage: string) => {
    const lower = userMessage.toLowerCase();
    let text = "That is a fascinating topic. I am preparing your seeds...";
    let shouldGenerate = false;

    if (lower.includes("front") || lower.includes("react")) {
      text =
        "🌱 Excellent choice. Front-end development is a vibrant ecosystem. I have prepared a curriculum covering React, Hooks, and State Management.";
      shouldGenerate = true;
    } else {
      text =
        "I can help you cultivate knowledge in many fields. Could you be more specific? Try 'Learn Python' or 'Master Photography'.";
    }

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        username: "Bonsai Guide",
        content: { text },
        timesend: new Date().toISOString(),
        isAI: true,
      },
    ]);
    setIsTyping(false);

    // No more mocks
    // if (shouldGenerate && onTreeGenerated) {
    //   setTimeout(() => {
    //     import("../../data/mockData").then(({ mockFrontendTree }) => onTreeGenerated(mockFrontendTree));
    //   }, 1000);
    // }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // --- UI RENDER ---
  return (
    <div className="flex flex-col h-full bg-[#fafaf9] relative overflow-hidden font-sans">
      {/* Background Texture (Subtle Dots) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#44403c 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Header */}
      <ChatHeader isConnected={isConnected} isTyping={isTyping} />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pt-24 pb-32 px-4 sm:px-6 space-y-6 scroll-smooth">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {/* Typing Indicator */}
        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <ChatInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        isConnected={isConnected}
        onSendMessage={handleSendMessage}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};
