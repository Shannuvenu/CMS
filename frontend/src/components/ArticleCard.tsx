import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2, FiUploadCloud, FiHeart, FiArrowRight } from "react-icons/fi";
import type { Article } from "../types/Article";
import "../styles/Shared.css";

interface AdminCardProps {
  variant: "admin";
  article: Article;
  onEdit: (article: Article) => void;
  onPublish: (id: number) => void;
  onDelete: (article: Article) => void;
}

interface UserCardProps {
  variant: "user";
  article: Article;
  onLike: (id: number) => void;
}

type ArticleCardProps = AdminCardProps | UserCardProps;

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const excerpt = (text: string, length = 140) =>
  text.length > length ? `${text.slice(0, length).trim()}…` : text;

export default function ArticleCard(props: ArticleCardProps) {
  const { article } = props;

  return (
    <div className="article-card">
      <div className="article-card-top">
        <span className="badge badge-category">{article.article_type}</span>
        <span
          className={`badge ${
            article.status === "published" ? "badge-published" : "badge-draft"
          }`}
        >
          {article.status === "published" ? "Published" : "Draft"}
        </span>
      </div>

      <h3 className="article-card-title">{article.title}</h3>
      <p className="article-card-excerpt">{excerpt(article.content)}</p>

      <div className="article-card-meta">
        <span>✍️ {article.author}</span>
        <span>📅 {formatDate(article.published_date)}</span>
        <span>❤️ {article.likes}</span>
      </div>

      {props.variant === "admin" ? (
        <div className="article-card-actions">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => props.onEdit(article)}
          >
            <FiEdit2 /> Edit
          </button>

          {article.status === "draft" && (
            <button
              className="btn btn-success btn-sm"
              onClick={() => props.onPublish(article.id)}
            >
              <FiUploadCloud /> Publish
            </button>
          )}

          <button
            className="btn btn-danger btn-sm"
            onClick={() => props.onDelete(article)}
          >
            <FiTrash2 /> Delete
          </button>
        </div>
      ) : (
        <div className="article-card-actions">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => props.onLike(article.id)}
          >
            <FiHeart /> Like
          </button>

          <Link
            to={`/article/${article.id}`}
            className="btn btn-primary btn-sm article-card-read-more"
          >
            Read More <FiArrowRight />
          </Link>
        </div>
      )}
    </div>
  );
}
