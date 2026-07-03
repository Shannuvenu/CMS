import axios, { AxiosError } from "axios";
import type { Article, ArticleFormValues, DashboardStats } from "../types/Article";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

export default API;

/** Extracts a readable message from an axios/API error for toast display. */
export const getErrorMessage = (error: unknown, fallback: string): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return axiosError.response?.data?.message || fallback;
  }
  return fallback;
};

// ---------------- Articles ----------------

export const getArticles = async (): Promise<Article[]> => {
  const { data } = await API.get<Article[]>("/articles");
  return data;
};

export const getPublishedArticles = async (): Promise<Article[]> => {
  const { data } = await API.get<Article[]>("/articles/published");
  return data;
};

export const getDraftArticles = async (): Promise<Article[]> => {
  const { data } = await API.get<Article[]>("/articles/drafts");
  return data;
};

export const getArticleById = async (id: number): Promise<Article> => {
  const { data } = await API.get<Article>(`/articles/${id}`);
  return data;
};

export const createArticle = async (
  article: ArticleFormValues
): Promise<Article> => {
  const { data } = await API.post<Article>("/articles", article);
  return data;
};

export const updateArticle = async (
  id: number,
  article: ArticleFormValues
): Promise<Article> => {
  const { data } = await API.put<Article>(`/articles/${id}`, article);
  return data;
};

export const deleteArticle = async (id: number): Promise<{ message: string }> => {
  const { data } = await API.delete<{ message: string }>(`/articles/${id}`);
  return data;
};

export const publishArticle = async (id: number): Promise<Article> => {
  const { data } = await API.put<Article>(`/articles/${id}/publish`);
  return data;
};

export const likeArticle = async (id: number): Promise<Article> => {
  const { data } = await API.put<Article>(`/articles/${id}/like`);
  return data;
};

// ---------------- Search ----------------

export const searchArticles = async (keyword: string): Promise<Article[]> => {
  const { data } = await API.get<Article[]>(
    `/articles/search/${encodeURIComponent(keyword)}`
  );
  return data;
};

// ---------------- Category ----------------

export const getArticlesByCategory = async (
  category: string
): Promise<Article[]> => {
  const { data } = await API.get<Article[]>(
    `/articles/category/${encodeURIComponent(category)}`
  );
  return data;
};

// ---------------- Author ----------------

export const getAuthorArticles = async (author: string): Promise<Article[]> => {
  const { data } = await API.get<Article[]>(
    `/articles/author/${encodeURIComponent(author)}`
  );
  return data;
};

// ---------------- Dashboard ----------------

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const { data } = await API.get<DashboardStats>("/articles/stats");
  return data;
};
