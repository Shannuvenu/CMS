import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import ArticleCard from "../components/ArticleCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

import {
  getPublishedArticles,
  likeArticle,
  getErrorMessage,
} from "../services/api";

import type { Article } from "../types/Article";
import "../styles/User.css";

export default function User() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await getPublishedArticles();
      setArticles(data);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to load articles."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleLike = async (id: number) => {
    // Optimistic update so the like feels instant.
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, likes: a.likes + 1 } : a))
    );

    try {
      await likeArticle(id);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to like article."));
      setArticles((prev) =>
        prev.map((a) => (a.id === id ? { ...a, likes: a.likes - 1 } : a))
      );
    }
  };

  const visibleArticles = useMemo(() => {
    let result = [...articles];

    if (category !== "All") {
      result = result.filter((a) => a.article_type === category);
    }

    if (search.trim()) {
      const term = search.trim().toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(term) ||
          a.content.toLowerCase().includes(term)
      );
    }

    return result.sort(
      (a, b) =>
        new Date(b.published_date).getTime() -
        new Date(a.published_date).getTime()
    );
  }, [articles, category, search]);

  return (
    <div className="user-page container">
      <section className="user-hero">
        <h1>Latest News</h1>
        <p>Stay up to date with the latest published stories.</p>
      </section>

      <div className="user-toolbar">
        <SearchBar value={search} onSearch={setSearch} placeholder="Search news..." />
      </div>

      <CategoryFilter selected={category} onChange={setCategory} />

      {loading ? (
        <Loader label="Loading news..." />
      ) : visibleArticles.length === 0 ? (
        <EmptyState
          title="No Articles Found"
          message="Check back soon, or try a different search or category."
        />
      ) : (
        <div className="article-grid">
          {visibleArticles.map((article) => (
            <ArticleCard
              key={article.id}
              variant="user"
              article={article}
              onLike={handleLike}
            />
          ))}
        </div>
      )}
    </div>
  );
}
