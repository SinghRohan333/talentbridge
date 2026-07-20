"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { ChatPanel } from "./ChatPanel";

export function ChatWidget() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (user?.role !== "seeker") return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-signal text-paper shadow-lg transition-transform hover:scale-105 sm:right-6"
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {isOpen && <ChatPanel />}
    </>
  );
}
