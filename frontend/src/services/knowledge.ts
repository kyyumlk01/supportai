import axios from "axios";

const knowledgeApi = axios.create({
  baseURL: "http://localhost:5000/api/knowledge",
});

knowledgeApi.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("supportai.auth.token") ??
    sessionStorage.getItem("supportai.auth.token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export interface KnowledgeArticle {
  _id?: string;
  id?: string;
  user?: string;
  title: string;
  category: string;
  content: string;
  description?: string;
  updatedAt?: string;
  status?: string;
  createdAt?: string;
}

interface KnowledgeResponse {
  success: boolean;
  articles: KnowledgeArticle[];
}

interface SingleKnowledgeResponse {
  success: boolean;
  message: string;
  article: KnowledgeArticle;
}

export const getKnowledgeArticles = async (): Promise<KnowledgeArticle[]> => {
  const { data } = await knowledgeApi.get<KnowledgeResponse>("/");

  return data.articles;
};

export const createKnowledgeArticle = async (
  article: Omit<
    KnowledgeArticle,
    "_id" | "id" | "user" | "createdAt" | "updatedAt"
  >
): Promise<KnowledgeArticle> => {
  const { data } = await knowledgeApi.post<SingleKnowledgeResponse>(
    "/",
    article
  );

  return data.article;
};

export const updateKnowledgeArticle = async (
  id: string,
  article: Partial<
    Omit<
      KnowledgeArticle,
      "_id" | "id" | "user" | "createdAt" | "updatedAt"
    >
  >
): Promise<KnowledgeArticle> => {
  const { data } = await knowledgeApi.put<SingleKnowledgeResponse>(
    `/${id}`,
    article
  );

  return data.article;
};

export const deleteKnowledgeArticle = async (
  id: string
): Promise<void> => {
  await knowledgeApi.delete(`/${id}`);
};