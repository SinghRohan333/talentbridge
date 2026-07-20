export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface LatestConversationResponse {
  conversationId: string | null;
  messages: ChatMessage[];
  suggestedFollowUps: string[];
}

export interface SendMessageResponse {
  conversationId: string;
  message: ChatMessage;
  suggestedFollowUps: string[];
}
