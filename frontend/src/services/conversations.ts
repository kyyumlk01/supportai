import axios from "axios";
import { getStoredToken } from "./auth";

const conversationsApi = axios.create({
  baseURL: "http://localhost:5000/api/conversations",
});

conversationsApi.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export interface Conversation {
  _id: string;
  customer: string;
  initials: string;
  subject: string;
  preview: string;
  status: "Open" | "Waiting" | "Resolved";
  channel: "Email" | "Chat" | "Social";
  user: string;
  createdAt: string;
  updatedAt: string;
}

export const getConversations = async () => {
  const { data } = await conversationsApi.get<{
    success: boolean;
    conversations: Conversation[];
  }>("/");

  return data.conversations;
};

export const createConversation = async (conversation: {
  customer: string;
  initials: string;
  subject: string;
  preview: string;
  status?: "Open" | "Waiting" | "Resolved";
  channel?: "Email" | "Chat" | "Social";
}) => {
  const { data } = await conversationsApi.post<{
    success: boolean;
    conversation: Conversation;
  }>("/", conversation);

  return data.conversation;
};