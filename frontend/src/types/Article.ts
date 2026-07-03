export type ArticleStatus = "draft" | "published";

export interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  article_type: string;
  status: ArticleStatus;
  likes: number;
  published_date: string;
  created_at?: string;
  updated_at?: string;
}

export interface DashboardStats {
  total_articles: number;
  published: number;
  drafts: number;
  total_likes: number;
}

export interface ArticleFormValues {
  title: string;
  content: string;
  author: string;
  article_type: string;
  published_date: string;
}

export const CATEGORIES: string[] = [
  "Technology",
  "Finance",
  "Sports",
  "Business",
  "Entertainment",
  "Health",
  "Education",
];

export type SortOption = "newest" | "oldest" | "likes" | "title-asc";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "likes", label: "Most Likes" },
  { value: "title-asc", label: "Title A-Z" },
];
