import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import ArticleForm from "../components/ArticleForm";
import ArticleCard from "../components/ArticleCard";
import DashboardCards from "../components/DashboardCards";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import SortDropdown from "../components/SortDropdown";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import ConfirmDialog from "../components/ConfirmDialog";

import {
  getArticles,
  deleteArticle,
  publishArticle,
  getDashboardStats,
  getErrorMessage,
} from "../services/api";

import type { Article, DashboardStats, SortOption } from "../types/Article";
import "../styles/Admin.css";

export default function Admin() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    total_articles: 0,
    published: 0,
    drafts: 0,
    total_likes: 0,
  });

  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Article | null>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("newest");

  const loadData = async () => {
    try {
      setLoading(true);
      const [articleData, statsData] = await Promise.all([
        getArticles(),
        getDashboardStats(),
      ]);
      setArticles(articleData);
      setStats(statsData);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to load dashboard data."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePublish = async (id: number) => {
    try {
      await publishArticle(id);
      toast.success("🚀 Article published");
      await loadData();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to publish article."));
    }
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteArticle(pendingDelete.id);
      toast.success("🗑 Article deleted");
      setPendingDelete(null);
      await loadData();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to delete article."));
    }
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

    switch (sort) {
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.published_date).getTime() -
            new Date(b.published_date).getTime()
        );
        break;
      case "likes":
        result.sort((a, b) => b.likes - a.likes);
        break;
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        result.sort(
          (a, b) =>
            new Date(b.published_date).getTime() -
            new Date(a.published_date).getTime()
        );
    }

    return result;
  }, [articles, category, search, sort]);

  return (
    <div className="admin-page container">
      <h1>Admin Dashboard</h1>

      <DashboardCards stats={stats} />

      <ArticleForm
        editingArticle={editingArticle}
        onSuccess={loadData}
        onCancelEdit={() => setEditingArticle(null)}
      />

      <div className="admin-toolbar">
        <SearchBar value={search} onSearch={setSearch} />
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      <CategoryFilter selected={category} onChange={setCategory} />

      <h2 className="admin-list-heading">
        All Articles {!loading && `(${visibleArticles.length})`}
      </h2>

      {loading ? (
        <Loader label="Loading articles..." />
      ) : visibleArticles.length === 0 ? (
        <EmptyState
          title="No Articles Found"
          message="Try a different search term, category, or create a new article above."
        />
      ) : (
        <div className="article-grid">
          {visibleArticles.map((article) => (
            <ArticleCard
              key={article.id}
              variant="admin"
              article={article}
              onEdit={handleEdit}
              onPublish={handlePublish}
              onDelete={setPendingDelete}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete Article"
        message={`Are you sure you want to delete "${pendingDelete?.title ?? ""}"? This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
