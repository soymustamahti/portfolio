"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import type { ChatMessage } from "@/types";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useKeyPress } from "@/hooks/useKeyPress";
import {
  ChatHeader,
  ChatMessageBubble,
  SuggestedQuestions,
  ChatInput,
  FloatingChatButton,
} from "@/components/chat";

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { locale } = useI18n();

  // Custom hooks for modal behavior
  useBodyScrollLock(isOpen);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setMessages([]);
  }, []);

  useKeyPress("Escape", closeModal, isOpen);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
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

    try {
      // Get conversation history (last 10 messages for context)
      const conversationHistory = messages.slice(-10).map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, conversationHistory }),
      });

      if (!response.ok) throw new Error("Failed to get response");

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
                const data = JSON.parse(line.slice(6));
                if (data.content) {
                  accumulatedContent += data.content;

                  if (!assistantMessageAdded) {
                    setMessages((prev) => [
                      ...prev,
                      { role: "assistant", content: accumulatedContent },
                    ]);
                    assistantMessageAdded = true;
                  } else {
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
              } catch (parseError) {
                console.error("Error parsing SSE:", parseError);
              }
            }
          }
        }
      }
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question);
    inputRef.current?.focus();
  };

  return (
    <>
      <FloatingChatButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />

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
              className="fixed inset-0 md:inset-4 lg:inset-8 xl:inset-16 z-[125] bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 backdrop-blur-xl md:rounded-3xl shadow-2xl shadow-accent/20 border-0 md:border border-accent/30 flex flex-col overflow-hidden"
            >
              <ChatHeader onClose={closeModal} />

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 min-h-0">
                {messages.map((msg, idx) => (
                  <ChatMessageBubble key={idx} message={msg} />
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              {messages.length <= 1 && (
                <SuggestedQuestions onSelect={handleSuggestedQuestion} />
              )}

              <ChatInput
                value={message}
                onChange={setMessage}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                inputRef={inputRef}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatBot;
