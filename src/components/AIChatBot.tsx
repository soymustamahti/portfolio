"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t, locale } = useI18n();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }

    // Prevent body scroll when modal is open and stop Lenis
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      // Stop Lenis smooth scroll
      document.body.setAttribute("data-lenis-prevent", "true");
      document.documentElement.classList.add("lenis-stopped");
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.removeAttribute("data-lenis-prevent");
      document.documentElement.classList.remove("lenis-stopped");
    }

    // Add ESC key listener
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      return () => {
        document.removeEventListener("keydown", handleEscKey);
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.body.removeAttribute("data-lenis-prevent");
        document.documentElement.classList.remove("lenis-stopped");
      };
    }
  }, [isOpen]);

  // Add welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage =
        locale === "fr"
          ? "Salut ! 👋 Je suis l'assistant IA de Mustapha. Je connais tout sur son portfolio, ses projets, ses compétences et son parcours. Posez-moi n'importe quelle question !"
          : "Hi there! 👋 I'm Mustapha's AI assistant. I know everything about his portfolio, projects, skills, and background. Ask me anything!";

      setMessages([{ role: "assistant", content: welcomeMessage }]);
    }
  }, [isOpen, messages.length, locale]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Get conversation history (last 10 messages for context)
      const conversationHistory = messages.slice(-10).map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = "";
      let assistantMessageAdded = false;

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const jsonStr = line.slice(6);
                const data = JSON.parse(jsonStr);
                if (data.content) {
                  accumulatedContent += data.content;

                  // Add assistant message on first content chunk
                  if (!assistantMessageAdded) {
                    setMessages((prev) => [
                      ...prev,
                      { role: "assistant", content: accumulatedContent },
                    ]);
                    assistantMessageAdded = true;
                  } else {
                    // Update the last message with accumulated content
                    setMessages((prev) => {
                      const newMessages = [...prev];
                      newMessages[newMessages.length - 1] = {
                        role: "assistant",
                        content: accumulatedContent,
                      };
                      return newMessages;
                    });
                  }
                }
              } catch (e) {
                console.error("Error parsing SSE:", e);
              }
            }
          }
        }
      }

      setIsTyping(false);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage =
        locale === "fr"
          ? "Désolé, une erreur s'est produite. Réessayez plus tard."
          : "Sorry, an error occurred. Please try again later.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: errorMessage },
      ]);
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions =
    locale === "fr"
      ? [
          "Quels sont les projets de Mustapha ?",
          "Quelles technologies maîtrise-t-il ?",
          "Parle-moi d'Archeon",
          "Quelle est son expérience ?",
          "Comment le contacter ?",
        ]
      : [
          "What are Mustapha's projects?",
          "What technologies does he know?",
          "Tell me about Archeon",
          "What's his experience?",
          "How to contact him?",
        ];

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question);
    inputRef.current?.focus();
  };

  const closeModal = () => {
    setIsOpen(false);
    setMessages([]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-[110] w-14 h-14 rounded-full bg-gradient-to-br from-accent via-purple-500 to-blue-500 shadow-lg shadow-accent/30 flex items-center justify-center cursor-pointer hover:shadow-xl hover:shadow-accent/40 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="text-2xl">✨</div>

        {/* Notification dot */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-primary"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[120]"
              onClick={closeModal}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              data-lenis-prevent
              className="fixed inset-4 md:inset-8 lg:inset-16 xl:inset-24 z-[125] bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-accent/20 border border-accent/30 flex flex-col overflow-hidden max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-4rem)] lg:max-h-[calc(100vh-8rem)] xl:max-h-[calc(100vh-12rem)]"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-accent/20 via-purple-500/20 to-blue-500/20 p-6 border-b border-accent/20">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent"></div>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-2xl">
                        🤖
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-secondary"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-textPrimary">
                        {t("chatBot.title")}
                      </h3>
                      <p className="text-sm text-green-400 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        {t("chatBot.status")}
                      </p>
                    </div>
                  </div>

                  {/* Close Button */}
                  <motion.button
                    onClick={closeModal}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-colors duration-200"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-400"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-accent to-purple-500 text-white rounded-br-md"
                          : "bg-primary/50 text-textSecondary border border-accent/20 rounded-bl-md"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <p className="text-base leading-relaxed whitespace-pre-wrap">
                          {msg.content}
                        </p>
                      ) : (
                        <div className="prose prose-invert prose-sm max-w-none">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({ children }) => (
                                <p className="mb-3 last:mb-0 leading-relaxed">
                                  {children}
                                </p>
                              ),
                              ul: ({ children }) => (
                                <ul className="list-disc pl-5 mb-3 space-y-1">
                                  {children}
                                </ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="list-decimal pl-5 mb-3 space-y-1">
                                  {children}
                                </ol>
                              ),
                              li: ({ children }) => (
                                <li className="leading-relaxed">{children}</li>
                              ),
                              strong: ({ children }) => (
                                <strong className="font-bold text-accent">
                                  {children}
                                </strong>
                              ),
                              em: ({ children }) => (
                                <em className="italic text-purple-300">
                                  {children}
                                </em>
                              ),
                              code: ({ children }) => (
                                <code className="bg-primary/50 px-1.5 py-0.5 rounded text-accent text-sm">
                                  {children}
                                </code>
                              ),
                              pre: ({ children }) => (
                                <pre className="bg-primary/50 p-3 rounded-lg overflow-x-auto mb-3">
                                  {children}
                                </pre>
                              ),
                              h1: ({ children }) => (
                                <h1 className="text-xl font-bold mb-2 text-textPrimary">
                                  {children}
                                </h1>
                              ),
                              h2: ({ children }) => (
                                <h2 className="text-lg font-bold mb-2 text-textPrimary">
                                  {children}
                                </h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-base font-bold mb-2 text-textPrimary">
                                  {children}
                                </h3>
                              ),
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              {messages.length <= 1 && (
                <div className="px-6 pb-4">
                  <p className="text-sm text-textSecondary mb-4 font-medium">
                    {t("chatBot.suggestions")}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {suggestedQuestions.map((q, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => handleSuggestedQuestion(q)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="text-sm px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-full border border-accent/30 transition-all duration-200 cursor-pointer"
                      >
                        {q}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="p-6 border-t border-accent/20"
              >
                <div className="flex gap-4">
                  <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("chatBot.placeholder")}
                    disabled={isLoading}
                    className="flex-1 bg-primary/50 border border-accent/30 rounded-xl px-5 py-3 text-base text-textPrimary placeholder:text-textSecondary/50 focus:outline-none focus:border-accent transition-colors duration-200 disabled:opacity-50"
                  />
                  <motion.button
                    type="submit"
                    disabled={isLoading || !message.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </motion.button>
                </div>
                <p className="text-xs text-textSecondary/50 mt-3 text-center">
                  {t("chatBot.poweredBy")}
                </p>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatBot;
