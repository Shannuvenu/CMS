import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";
import { createArticle, updateArticle, publishArticle, getErrorMessage } from "../services/api";
import { CATEGORIES } from "../types/Article";
import type { Article } from "../types/Article";
import "../styles/ArticleForm.css";

interface ArticleFormProps {
  editingArticle: Article | null;
  onSuccess: () => void;
  onCancelEdit: () => void;
}

const emptyForm = {
  title: "",
  content: "",
  author: "",
  article_type: CATEGORIES[0],
  status: "draft" as "draft" | "published",
};

export default function ArticleForm({
  editingArticle,
  onSuccess,
  onCancelEdit,
}: ArticleFormProps) {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const isEditing = Boolean(editingArticle);

  useEffect(() => {
    if (editingArticle) {
      setForm({
        title: editingArticle.title,
        content: editingArticle.content,
        author: editingArticle.author,
        article_type: editingArticle.article_type,
        status: editingArticle.status,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingArticle]);

  const resetForm = () => setForm(emptyForm);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim() || !form.author.trim()) {
      toast.error("Please fill in title, author, and content.");
      return;
    }

    setSubmitting(true);

    const payload = {
      title: form.title.trim(),
      content: form.content.trim(),
      author: form.author.trim(),
      article_type: form.article_type,
      published_date: editingArticle?.published_date || new Date().toISOString(),
    };

    try {
      if (isEditing && editingArticle) {
        await updateArticle(editingArticle.id, payload);

        if (form.status === "published" && editingArticle.status === "draft") {
          await publishArticle(editingArticle.id);
        }

        toast.success("✏️ Article updated");
        onCancelEdit();
      } else {
        const created = await createArticle(payload);

        if (form.status === "published") {
          await publishArticle(created.id);
        }

        toast.success("✅ Article created");
        resetForm();
      }

      onSuccess();
    } catch (error) {
      toast.error(getErrorMessage(error, "Something went wrong. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  return (
    <form className="article-form" onSubmit={handleSubmit}>
      <div className="article-form-header">
        <h2>{isEditing ? "Edit Article" : "Create Article"}</h2>
        {isEditing && (
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={handleCancel}
          >
            <FiX /> Cancel
          </button>
        )}
      </div>

      <div className="article-form-grid">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          required
        />

        <select
          value={form.article_type}
          onChange={(e) => setForm({ ...form, article_type: e.target.value })}
        >
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="article-form-status">
          <label>
            <input
              type="radio"
              value="draft"
              checked={form.status === "draft"}
              onChange={() => setForm({ ...form, status: "draft" })}
            />
            Draft
          </label>
          <label>
            <input
              type="radio"
              value="published"
              checked={form.status === "published"}
              onChange={() => setForm({ ...form, status: "published" })}
            />
            Publish
          </label>
        </div>
      </div>

      <textarea
        rows={8}
        placeholder="Write article content..."
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        required
      />

      <div className="article-form-footer">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting
            ? "Saving..."
            : isEditing
            ? "Save Changes"
            : "Save Article"}
        </button>
      </div>
    </form>
  );
}
