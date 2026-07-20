"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { Send, RotateCcw, Sparkles } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { cn } from "@/lib/utils";

export function ChatPanel() {
  const {
    messages,
    suggestedFollowUps,
    isLoadingHistory,
    isSending,
    sendMessage,
    startNewChat,
  } = useChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isSending]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="fixed bottom-24 right-5 z-40 flex h-[70vh] max-h-[560px] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-2xl sm:right-6">
      <div className="flex items-center justify-between border-b border-line bg-white/80 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-signal/10">
            <Sparkles className="h-4 w-4 text-signal" />
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Career Assistant</p>
            <p className="text-xs text-slate">
              Ask about jobs, applications, or your search
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={startNewChat}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate hover:bg-line/30"
          aria-label="Start new conversation"
          title="Start new conversation"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
      >
        {isLoadingHistory ? (
          <div className="space-y-2">
            <div className="h-10 w-2/3 animate-pulse rounded-2xl bg-line" />
            <div className="ml-auto h-8 w-1/2 animate-pulse rounded-2xl bg-line" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 py-10 text-center">
            <Sparkles className="h-6 w-6 text-signal" />
            <p className="text-sm font-medium text-ink">
              Hi! I&apos;m your career assistant.
            </p>
            <p className="max-w-[220px] text-xs text-slate">
              Ask me to find jobs, explain a posting, or check your application
              status.
            </p>
          </div>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "flex",
                m.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "bg-signal text-paper"
                    : "bg-white/80 text-ink",
                )}
              >
                {m.content}
              </div>
            </div>
          ))
        )}

        {isSending && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl bg-white/80 px-4 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate" />
            </div>
          </div>
        )}
      </div>

      {suggestedFollowUps.length > 0 && !isSending && (
        <div className="flex flex-wrap gap-1.5 border-t border-line px-4 py-2.5">
          {suggestedFollowUps.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => sendMessage(suggestion)}
              className="rounded-full border border-line bg-white/60 px-2.5 py-1 text-xs text-ink hover:border-signal hover:text-signal"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-line p-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about jobs…"
          disabled={isSending}
          className="min-h-10 flex-1 rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-slate/70 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20"
        />
        <button
          type="submit"
          disabled={isSending || !input.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-signal text-paper disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
