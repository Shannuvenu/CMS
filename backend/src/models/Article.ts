export interface Article {
  id?: number;
  title: string;
  content: string;
  author: string;
  published_date: string;
  article_type: string;
  created_at?: string;
  updated_at?: string;
}