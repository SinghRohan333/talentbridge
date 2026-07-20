"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/utils";
import {
  ChatMessage,
  LatestConversationResponse,
  SendMessageResponse,
} from "@/types/chat";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [suggestedFollowUps, setSuggestedFollowUps] = useState<string[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const hasLoadedRef = useRef(false);

  const loadHistory = useCallback(async () => {
    try {
      const { data } =
        await api.get<LatestConversationResponse>("/api/chat/latest");
      setMessages(data.messages);
      setSuggestedFollowUps(data.suggestedFollowUps);
      setConversationId(data.conversationId);
    } catch {
      // silent — chat just starts fresh if history can't load
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;
    loadHistory();
  }, [loadHistory]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isSending) return;

      setMessages((prev) => [
        ...prev,
        { role: "user", content: trimmed, timestamp: new Date().toISOString() },
      ]);
      setSuggestedFollowUps([]);
      setIsSending(true);

      try {
        const { data } = await api.post<SendMessageResponse>(
          "/api/chat/message",
          {
            message: trimmed,
            conversationId: conversationId ?? undefined,
          },
        );
        setConversationId(data.conversationId);
        setMessages((prev) => [...prev, data.message]);
        setSuggestedFollowUps(data.suggestedFollowUps);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: getErrorMessage(
              err,
              "Sorry, something went wrong — please try again.",
            ),
            timestamp: new Date().toISOString(),
          },
        ]);
      } finally {
        setIsSending(false);
      }
    },
    [conversationId, isSending],
  );

  const startNewChat = useCallback(() => {
    setMessages([]);
    setSuggestedFollowUps([]);
    setConversationId(null);
  }, []);

  return {
    messages,
    suggestedFollowUps,
    isLoadingHistory,
    isSending,
    sendMessage,
    startNewChat,
  };
}
