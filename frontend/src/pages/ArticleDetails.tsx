import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowLeft, FiHeart } from "react-icons/fi";

import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

import { getArticleById, likeArticle, getErrorMessage } from "../services/api";
import type { Article } from "../types/Article";
import "../styles/User.css";

export default function ArticleDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getArticleById(Number(id));
        setArticle(data);
      } catch (error) {
        setNotFound(true);
        toast.error(getErrorMessage(error, "Article not found."));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleLike = async () => {
    if (!article) return;
    setArticle({ ...article, likes: article.likes + 1 });

    try {
      await likeArticle(article.id);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to like article."));
      setArticle((prev) => prev && { ...prev, likes: prev.likes - 1 });
    }
  };

  if (loading) {
    return (
      <div className="user-page container">
        <Loader label="Loading article..." />
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="user-page container">
        <EmptyState
          icon="🔍"
          title="Article Not Found"
          message="This article may have been removed or unpublished."
        />
        <button className="btn btn-outline" onClick={() => navigate("/")}>
          <FiArrowLeft /> Back to News
        </button>
      </div>
    );
  }

  return (
    <div className="user-page container article-details">
      <button className="btn btn-outline btn-sm" onClick={() => navigate(-1)}>
        <FiArrowLeft /> Back
      </button>

      <span className="badge badge-category article-details-badge">
        {article.article_type}
      </span>

      <h1>{article.title}</h1>

      <div className="article-details-meta">
        <span>✍️ {article.author}</span>
        <span>
          📅{" "}
          {new Date(article.published_date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      <p className="article-details-content">{article.content}</p>

      <button className="btn btn-outline" onClick={handleLike}>
        <FiHeart /> Like ({article.likes})
      </button>
    </div>
  );
}
