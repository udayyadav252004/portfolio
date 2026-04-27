"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  initialAssistantMessage,
  type PortfolioChatMessage
} from "@/lib/portfolioAssistant";

type ChatMessage = PortfolioChatMessage & {
  id: string;
};

const starterMessages: ChatMessage[] = [
  {
    id: "assistant-welcome",
    role: "assistant",
    content: initialAssistantMessage
  }
];

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M12 3 13.85 8.15 19 10l-5.15 1.85L12 17l-1.85-5.15L5 10l5.15-1.85L12 3Z" />
      <path d="M19 3v4" />
      <path d="M21 5h-4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M4 12 20 4 14 20 11 13 4 12Z" />
    </svg>
  );
}

function TypingIndicator() {
  return (
    <div className="inline-flex items-center gap-1 rounded-2xl rounded-bl-md border border-blue-200/10 bg-slate-900/90 px-4 py-3">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="h-2 w-2 rounded-full bg-cyan-200/85"
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: index * 0.12 }}
        />
      ))}
    </div>
  );
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [isSending, setIsSending] = useState(false);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen || !messagesRef.current) {
      return;
    }

    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [isOpen, isSending, messages]);

  useEffect(() => {
    if (!isOpen || !inputRef.current) {
      return;
    }

    inputRef.current.focus();
  }, [isOpen]);

  const submitMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = input.trim();

    if (!trimmed || isSending) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed
    };

    const conversation = [...messages, userMessage];

    setMessages(conversation);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: conversation.map(({ role, content }) => ({ role, content }))
        })
      });

      const payload = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      const reply =
        response.ok && payload?.message
          ? payload.message
          : "I'm having trouble right now. Try again.";

      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: reply
        }
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: "I'm having trouble right now. Try again."
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-40 md:bottom-8 md:right-8">
      <AnimatePresence>
        {isOpen ? (
          <motion.section
            key="chat-panel"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="pointer-events-auto mb-4 w-[calc(100vw-1.5rem)] max-w-[380px] overflow-hidden rounded-[2rem] border border-blue-200/15 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.98))] shadow-[0_24px_80px_rgba(2,6,23,0.55)] backdrop-blur-xl"
          >
            <div className="border-b border-blue-200/10 px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Uday&apos;s AI Assistant</p>
                  <p className="mt-1 text-xs text-slate-300/75">
                    Ask about projects, skills, or contact details.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-white/10 p-2 text-slate-300 transition-colors duration-200 hover:border-blue-200/30 hover:text-white"
                  aria-label="Close chat"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            <div ref={messagesRef} className="max-h-[56vh] space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "rounded-br-md bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-950"
                        : "rounded-bl-md border border-blue-200/10 bg-slate-900/90 text-slate-100"
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}

              {isSending ? (
                <div className="flex justify-start">
                  <TypingIndicator />
                </div>
              ) : null}
            </div>

            <form onSubmit={submitMessage} className="border-t border-blue-200/10 p-4">
              <div className="flex items-center gap-3 rounded-2xl border border-blue-200/10 bg-black/20 px-3 py-3">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about StartupMantra, skills, or contact..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={isSending || !input.trim()}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-950 transition-transform duration-200 hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Send message"
                >
                  <SendIcon />
                </button>
              </div>
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        whileTap={{ scale: 0.96 }}
        className="pointer-events-auto flex items-center gap-3 rounded-full border border-blue-200/20 bg-gradient-to-r from-slate-900/95 via-slate-900/95 to-blue-950/95 px-4 py-3 text-left text-white shadow-[0_18px_48px_rgba(15,23,42,0.45)] backdrop-blur-xl transition-transform duration-200 hover:-translate-y-0.5"
        aria-label="Open AI assistant"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-950">
          <SparkIcon />
        </span>
        <span className="hidden min-w-[124px] md:block">
          <span className="block text-sm font-semibold">Ask Uday&apos;s AI</span>
          <span className="block text-xs text-slate-300/70">Projects, skills, work</span>
        </span>
      </motion.button>
    </div>
  );
}
